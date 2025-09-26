# 🎭 Meme Maker - Cross-platform App

Ứng dụng tạo meme đa nền tảng được xây dựng với **Vite + React + TypeScript + Capacitor**, có thể chạy trên Web, Android và iOS.

## 📱 Tính năng

### ✅ Yêu cầu tối thiểu
- **📸 Chọn ảnh từ thư viện**: Sử dụng Capacitor Camera plugin
- **✏️ Vẽ chữ lên ảnh**: Canvas API với text trên/dưới
- **💾 Lưu và chia sẻ meme**: Filesystem + Share plugins

### 🎨 Tính năng mở rộng
- **🎭 Bộ lọc ảnh**: 6 filter khác nhau (Sepia, Grayscale, Blur, v.v.)
- **🎨 Tùy chỉnh text**: Màu sắc, cỡ chữ, màu viền
- **📱 Responsive Design**: Tối ưu cho mobile và desktop
- **✨ UI hiện đại**: Glass-morphism design với animations

### 🔧 Tính năng kỹ thuật
- **Cross-platform compatibility**: Web/Android/iOS
- **Auto text wrapping**: Tự động xuống dòng
- **Real-time preview**: Xem trước khi chỉnh sửa
- **Error handling**: Xử lý lỗi và fallback
- **Debug tools**: Công cụ debug canvas

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js >= 16
- npm hoặc yarn
- Android Studio (cho Android build)
- Xcode (cho iOS build - chỉ trên macOS)

### 1. Clone và cài đặt dependencies

```bash
# Clone repository
git clone <repository-url>
cd meme-maker

# Cài đặt dependencies
npm install

# Cài đặt Capacitor và plugins
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
npm install @capacitor/camera @capacitor/filesystem @capacitor/share

# Khởi tạo Capacitor
npx cap init meme-maker com.example.mememaker
```

### 2. Development (Web)

```bash
# Chạy development server
npm run dev

# Mở browser tại http://localhost:5173
```

### 3. Build cho Production

```bash
# Build cho web
npm run build
npm run preview

# Sync với Capacitor (sau khi build)
npm run sync
```

### 4. Build cho Mobile

#### Android
```bash
# Build và mở Android Studio
npm run build:android

# Hoặc từng bước
npm run build
npx cap add android
npx cap copy android
npx cap open android
```

#### iOS (chỉ trên macOS)
```bash
# Build và mở Xcode
npm run build:ios

# Hoặc từng bước  
npm run build
npx cap add ios
npx cap copy ios
npx cap open ios
```

## 📁 Cấu trúc dự án

```
meme-maker/
├── src/
│   ├── App.tsx          # Main component
│   ├── App.css          # Styles
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # Type definitions
├── public/              # Static assets
├── android/             # Android platform (sau khi add)
├── ios/                 # iOS platform (sau khi add)
├── capacitor.config.ts  # Capacitor configuration
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # Documentation
```

## ⚙️ Cấu hình

### capacitor.config.ts
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mememaker',
  appName: 'Meme Maker',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};
```

### Permissions (Android)

Thêm vào `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```

## 🎯 Cách sử dụng

1. **Chọn ảnh**: Bấm "Chọn ảnh từ thư viện"
2. **Áp dụng filter**: Chọn bộ lọc từ danh sách
3. **Thêm text**: Nhập text trên và dưới
4. **Tùy chỉnh**: Điều chỉnh cỡ chữ, màu sắc
5. **Lưu**: Bấm "Lưu Meme" để lưu và chia sẻ

## 🔧 Scripts có sẵn

```bash
# Development
npm run dev                 # Chạy dev server
npm run build              # Build production
npm run preview            # Preview production build

# Mobile builds
npm run build:android      # Build và mở Android Studio
npm run build:ios          # Build và mở Xcode (macOS only)

# Capacitor
npm run sync               # Sync native projects
npx cap serve             # Serve với live reload trên device
```

## 🐛 Debug và Troubleshooting

### Nút lưu không hoạt động

1. **Mở Developer Console** (F12) để xem logs
2. **Bấm "Debug Canvas"** để kiểm tra canvas content
3. **Kiểm tra platform**: Web sẽ download file, mobile sẽ dùng native APIs

### Không chọn được ảnh

1. **Kiểm tra permissions**: Camera và Photos access
2. **Test trên device thật**: Emulator có thể không có ảnh
3. **Xem console logs** để biết lỗi cụ thể

### Build mobile thất bại

```bash
# Clean và rebuild
npm run build
npx cap sync
npx cap clean android  # hoặc ios
npx cap copy android   # hoặc ios
```

## 📚 Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **Mobile**: Capacitor 5
- **Styling**: CSS3 với Glass-morphism design
- **Canvas**: HTML5 Canvas API
- **Plugins**: 
  - `@capacitor/camera` - Chọn ảnh
  - `@capacitor/filesystem` - Lưu file
  - `@capacitor/share` - Chia sẻ

## 🎨 Design Features

- **Glass-morphism UI**: Hiệu ứng kính mờ hiện đại
- **Gradient backgrounds**: Màu nền đẹp mắt
- **Smooth animations**: Chuyển động mượt mà
- **Responsive design**: Tương thích mobile/desktop
- **Dark theme**: Giao diện tối dễ nhìn

## 📝 License

MIT License - Tự do sử dụng và phát triển.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Support

Nếu gặp vấn đề, hãy:
1. Kiểm tra [Issues](https://github.com/your-repo/issues)
2. Tạo issue mới với mô tả chi tiết
3. Gửi logs từ console nếu có

---

**Made with ❤️ using Vite + React + Capacitor**