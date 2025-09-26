import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import './App.css';

interface MemeEditorProps {
  image: string;
  onSave: (dataUrl: string) => void;
}

interface FilterControlsProps {
  onFilterChange: (filter: string) => void;
}

interface Filter {
  name: string;
  value: string;
}

const MemeEditor: React.FC<MemeEditorProps> = ({ image, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(40);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [strokeColor, setStrokeColor] = useState<string>('#000000');

  useEffect(() => {
    if (image && canvasRef.current) {
      drawMeme();
    }
  }, [image, topText, bottomText, fontSize, textColor, strokeColor]);

  const drawMeme = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = 500;
      canvas.height = (img.height / img.width) * 500;
      
      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Setup text style
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      
      // Draw top text
      if (topText) {
        const lines = wrapText(ctx, topText.toUpperCase(), canvas.width - 20);
        lines.forEach((line, index) => {
          const y = 50 + (index * fontSize);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }
      
      // Draw bottom text
      if (bottomText) {
        const lines = wrapText(ctx, bottomText.toUpperCase(), canvas.width - 20);
        const startY = canvas.height - (lines.length * fontSize) - 20;
        lines.forEach((line, index) => {
          const y = startY + (index * fontSize);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }
    };
    
    img.src = image;
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  const handleSave = async (): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onSave(dataUrl);
  };

  const handleTopTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTopText(e.target.value);
  };

  const handleBottomTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBottomText(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFontSize(Number(e.target.value));
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTextColor(e.target.value);
  };

  const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStrokeColor(e.target.value);
  };

  return (
    <div className="meme-editor">
      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
      
      <div className="controls">
        <div className="text-controls">
          <input
            type="text"
            placeholder="Text trên"
            value={topText}
            onChange={handleTopTextChange}
            className="text-input"
          />
          <input
            type="text"
            placeholder="Text dưới"
            value={bottomText}
            onChange={handleBottomTextChange}
            className="text-input"
          />
        </div>
        
        <div className="style-controls">
          <label>
            Cỡ chữ:
            <input
              type="range"
              min="20"
              max="80"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
            <span>{fontSize}px</span>
          </label>
          
          <label>
            Màu chữ:
            <input
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
            />
          </label>
          
          <label>
            Màu viền:
            <input
              type="color"
              value={strokeColor}
              onChange={handleStrokeColorChange}
            />
          </label>
        </div>
        
        <button onClick={handleSave} className="save-btn">
          Lưu Meme
        </button>
      </div>
    </div>
  );
};

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  const filters: Filter[] = [
    { name: 'Gốc', value: 'none' },
    { name: 'Sepia', value: 'sepia(100%)' },
    { name: 'Đen trắng', value: 'grayscale(100%)' },
    { name: 'Blur', value: 'blur(2px)' },
    { name: 'Tương phản cao', value: 'contrast(150%)' },
    { name: 'Sáng', value: 'brightness(130%)' }
  ];

  const handleFilterClick = (filter: Filter): void => {
    onFilterChange(filter.value);
  };

  return (
    <div className="filter-controls">
      <h3>Bộ lọc</h3>
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => handleFilterClick(filter)}
            className="filter-btn"
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('none');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectImage = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (image.dataUrl) {
        setSelectedImage(image.dataUrl);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      alert('Không thể chọn ảnh. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  const saveMeme = async (dataUrl: string): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('Bắt đầu lưu meme...');
      
      // Kiểm tra platform
      const isWeb = !window.Capacitor?.isNativePlatform();
      
      if (isWeb) {
        // Web fallback - download file
        console.log('Chạy trên web, sử dụng download...');
        downloadFile(dataUrl, `meme_${Date.now()}.jpg`);
        
        // Web share API hoặc copy to clipboard
        if (navigator.share) {
          try {
            // Convert dataUrl to blob for sharing
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const file = new File([blob], `meme_${Date.now()}.jpg`, { type: 'image/jpeg' });
            
            await navigator.share({
              title: 'Meme của tôi',
              text: 'Tôi vừa tạo một meme hay!',
              files: [file]
            });
          } catch (shareError) {
            console.log('Web Share API không hỗ trợ, copy link...');
            copyToClipboard(dataUrl);
          }
        } else {
          copyToClipboard(dataUrl);
        }
        
        alert('Meme đã được tải xuống và sao chép!');
      } else {
        // Mobile platform
        console.log('Chạy trên mobile, sử dụng Capacitor...');
        
        try {
          // Save to filesystem
          const fileName = `meme_${Date.now()}.jpg`;
          const base64Data = dataUrl.split(',')[1];
          
          const result = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Documents
          });
          
          console.log('File saved:', result.uri);

          // Share the meme
          await Share.share({
            title: 'Meme của tôi',
            text: 'Tôi vừa tạo một meme hay!',
            url: dataUrl,
            dialogTitle: 'Chia sẻ meme'
          });

          alert('Meme đã được lưu và chia sẻ!');
        } catch (capacitorError) {
          console.error('Lỗi Capacitor:', capacitorError);
          // Fallback to download
          downloadFile(dataUrl, `meme_${Date.now()}.jpg`);
          alert('Meme đã được tải xuống!');
        }
      }
    } catch (error) {
      console.error('Error saving meme:', error);
      // Last resort fallback
      try {
        downloadFile(dataUrl, `meme_${Date.now()}.jpg`);
        alert('Meme đã được tải xuống (fallback)!');
      } catch (downloadError) {
        console.error('Download error:', downloadError);
        alert('Không thể lưu meme. Vui lòng thử lại hoặc chụp màn hình!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const downloadFile = (dataUrl: string, filename: string): void => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Đã copy data URL to clipboard');
    } catch (err) {
      console.log('Không thể copy to clipboard:', err);
    }
  };

  const handleFilterChange = (filter: string): void => {
    setCurrentFilter(filter);
  };

  const handleBackToSelection = (): void => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎭 Meme Maker</h1>
        <p>Tạo meme vui nhộn từ ảnh của bạn!</p>
      </header>

      <main className="app-main">
        {!selectedImage ? (
          <div className="welcome-screen">
            <div className="upload-section">
              <button 
                onClick={selectImage} 
                className="select-image-btn"
                disabled={isLoading}
              >
                {isLoading ? '🔄 Đang tải...' : '📱 Chọn ảnh từ thư viện'}
              </button>
              <p className="hint">Chọn một ảnh để bắt đầu tạo meme!</p>
            </div>
            
            <div className="features">
              <h3>✨ Tính năng</h3>
              <ul>
                <li>📸 Chọn ảnh từ thư viện</li>
                <li>✏️ Thêm text trên và dưới</li>
                <li>🎨 Tùy chỉnh màu sắc và cỡ chữ</li>
                <li>🎭 Áp dụng bộ lọc ảnh</li>
                <li>💾 Lưu và chia sẻ meme</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="editor-screen">
            <div className="image-preview" style={{ filter: currentFilter }}>
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
            </div>
            
            <FilterControls onFilterChange={handleFilterChange} />
            
            <MemeEditor 
              image={selectedImage} 
              onSave={saveMeme}
            />
            
            <div className="actions">
              <button 
                onClick={handleBackToSelection} 
                className="back-btn"
              >
                🔄 Chọn ảnh khác
              </button>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner">🔄</div>
            <p>Đang xử lý...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;