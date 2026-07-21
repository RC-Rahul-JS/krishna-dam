<div align="center">

# 🌐 Krishna Dham — 360° Virtual Tour

<img src="public/3D.png" alt="Krishna Dham Colony" width="600"/>

### *Walk through your future home before you buy it.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Pannellum](https://img.shields.io/badge/Pannellum-360°-FF6B35?style=for-the-badge&logo=googlemaps&logoColor=white)](https://pannellum.org)
[![AWS S3](https://img.shields.io/badge/AWS_S3-Storage-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)](package.json)
[![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)]()
[![Views](https://img.shields.io/badge/360°_Images-113-purple?style=flat-square)]()

</div>

---

## 🏆 Achievements

<div align="center">

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/RC-Rahul-JS/krishna-dam?style=for-the-badge&color=green&label=Commits)
![GitHub last commit](https://img.shields.io/github/last-commit/RC-Rahul-JS/krishna-dam?style=for-the-badge&color=blue)
![GitHub repo size](https://img.shields.io/github/repo-size/RC-Rahul-JS/krishna-dam?style=for-the-badge&color=orange)
![GitHub stars](https://img.shields.io/github/stars/RC-Rahul-JS/krishna-dam?style=for-the-badge&color=yellow)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔭 **360° Street View** | Navigate 113 panoramic images of the colony like Google Maps Street View |
| 🏹 **Smart Hotspots** | Arrows auto-position at exact yaw/pitch using gnomonic projection math |
| 🗺️ **Master Plan Map** | Full colony layout with TC&P approved plot details |
| 🎬 **Video Gallery** | Live preview video + 12-image masonry photo grid |
| 📱 **Fully Responsive** | Works on all screen sizes from mobile to 4K |
| ⚡ **AWS S3 Powered** | 113 panoramas served via S3 with Vite proxy for CORS-free loading |
| 🌿 **Premium Design** | Glassmorphism, smooth animations, Montserrat + Cormorant Garamond fonts |

---

## 🚀 Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite 8 |
| **360° Viewer** | Pannellum React |
| **Styling** | TailwindCSS 4 + Vanilla CSS |
| **Routing** | React Router DOM v6 |
| **Icons** | Lucide React |
| **Storage** | AWS S3 (eu-north-1) |
| **Fonts** | Google Fonts (Montserrat, Cormorant Garamond, Great Vibes) |

</div>

---

## 📁 Project Structure

```
krishna-dam/
├── public/
│   ├── data/
│   │   ├── map.json          # 1962 lines of hotspot navigation data
│   │   ├── angles.json       # Initial yaw/pitch for 113 panoramas
│   │   └── remote_urls.json  # S3 URLs for all 113 images
│   ├── 3D.png                # Hero 3D colony model
│   ├── map.png               # Master plan layout
│   └── VIDEO.mp4             # Colony walkthrough video
└── src/
    ├── LandingPage.jsx       # Hero section + full page scroll
    ├── View360.jsx           # 360° tour controller (113 images)
    ├── PanoramaViewer.jsx    # Pannellum viewer + gnomonic arrow projection
    ├── MapPreview.jsx        # Master plan with plot details
    ├── FeaturesSection.jsx   # Premium amenities showcase
    ├── VideoSection.jsx      # Video + masonry image grid
    ├── AboutPage.jsx         # About Krishna Dham
    ├── ContactSection.jsx    # Contact information
    └── Footer.jsx            # Footer with social links
```

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/RC-Rahul-JS/krishna-dam.git
cd krishna-dam

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Hero, About, Map, Features, Video, Contact |
| `/tour` | 360° Tour | Full immersive street-view navigation |
| `/about` | About | Krishna Dham colony details |

---

## 🏡 About Krishna Dham

> *Krishna Dham is an exclusive plotted community designed for those who appreciate premium living.*

- 📐 **Plot Sizes**: 100–500 sq.yd
- 💰 **Booking**: Starting from ₹20,000
- 🏗️ **Total Price**: ₹11 Lakh onwards
- ✅ **Status**: Fully TC&P Approved
- 🌿 **Features**: Vastu-Compliant, Gated Community, Wide CC Roads, Underground Electricity, 24/7 Water Supply

---

## 📸 Screenshots

| Landing Page | 360° Tour |
|-------------|-----------|
| Hero with 3D model, features & pricing | Immersive street-view with navigation arrows |

---

<div align="center">

**Built with ❤️ by [RC-Rahul-JS](https://github.com/RC-Rahul-JS)**

[![GitHub](https://img.shields.io/badge/GitHub-RC--Rahul--JS-181717?style=for-the-badge&logo=github)](https://github.com/RC-Rahul-JS)

*Managed & Handled by **Duniyape Technologies***

</div>
