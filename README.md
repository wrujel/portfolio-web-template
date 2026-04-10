<div align='center'>

  [![demo][demo]][demo-link]
  [![status][status]][status-link]
  [![deploy][deploy]][deploy-link]
  [![test][tests]][tests-link]

</div>

<!-- TODO: Add a screenshot at /public/images/screenshot.png -->
<div align='center'>
  <a href='/'>
    <img
      src='/public/screenshot.png'
      alt='Screenshot of the app'
      width='100%'
    />
  </a>
</div>

<div align='center'>
  <h1>Portfolio Web with Next.js</h1>
</div>

<div align='center'>

  [![Next.js][nextjs]][nextjs-link]
  [![TypeScript][typescript]][typescript-link]
  [![Tailwind CSS][tailwindcss]][tailwindcss-link]
  [![React][react]][react-link]
  [![Framer Motion][framer-motion]][framer-motion-link]
  [![tsParticles][tsparticles]][tsparticles-link]
  [![Swiper][swiper]][swiper-link]
  [![React CountUp][react-countup]][react-countup-link]
  [![React Icons][react-icons]][react-icons-link]
  [![Vercel][vercel]][vercel-link]

</div>

<div align='center'>
  A modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth page transitions, interactive particle animations, service showcases, project galleries, customer testimonials, and a contact form.

  [Demo]({{DEMO_URL}}) · [Report issue](/issues) · [Suggest something](/issues)
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running locally](#running-locally)
  - [Build](#build)
- [Project Structure](#project-structure)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Features

- [x] Smooth page transitions with Framer Motion
- [x] Interactive particle animations on hero section
- [x] Responsive design with Tailwind CSS
- [x] Dark theme with custom color palette
- [x] Service showcase with Swiper carousel
- [x] Project gallery with expandable hover cards
- [x] Customer testimonials slider
- [x] Animated stat counters (experience, customers, projects, awards)
- [x] Contact form with name, email, and message fields
- [x] Social media integration (Instagram, YouTube, TikTok, Pinterest, Twitter, Behance)
- [x] Multi-page navigation with route-based sections
- [x] Optimized image loading with skeleton animations
- [x] Built with Next.js 14 App Router

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Framer Motion](https://motion.dev/)
- [tsParticles](https://particles.js.org/)
- [Swiper](https://swiperjs.com/)
- [React CountUp](https://www.npmjs.com/package/react-countup)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/wrujel/portfolio-web-template.git
cd portfolio-web-template
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

## Project Structure

```
/
├── public/
│   └── assets/
│       ├── avatar.png
│       ├── about.png
│       ├── avatar_with_tablet.png
│       ├── project-1.png ... project-5.png
│       └── review-1.jpg ... review-5.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/
│   │   ├── contacts/
│   │   ├── customers/
│   │   ├── projects/
│   │   └── services/
│   ├── components/
│   │   ├── About/
│   │   ├── Avatar/
│   │   ├── Contact/
│   │   ├── Cover/
│   │   ├── Customers/
│   │   ├── Header/
│   │   ├── ImageContainer/
│   │   ├── Introduction/
│   │   ├── Navbar/
│   │   ├── Projects/
│   │   ├── Services/
│   │   └── Transition/
│   └── utils/
│       └── motionTransition.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Demo

You can check out the demo:

[![Demo][demo]][demo-link]

## Contributing

Contributions are welcome! If you have suggestions or find bugs, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---

<!-- Badges -->
[nextjs]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js
[typescript]: https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue
[tailwindcss]: https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[framer-motion]: https://img.shields.io/badge/Framer%20Motion-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[tsparticles]: https://img.shields.io/badge/Tsparticles-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[swiper]: https://img.shields.io/badge/Swiper-6332D2?style=for-the-badge&logo=swiper&logoColor=white
[react-countup]: https://img.shields.io/badge/React%20Countup-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-icons]: https://img.shields.io/badge/React--Icons-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white

<!-- Badge links -->
[nextjs-link]: https://nextjs.org/
[typescript-link]: https://www.typescriptlang.org/
[tailwindcss-link]: https://tailwindcss.com/
[react-link]: https://react.dev/
[framer-motion-link]: https://motion.dev/
[tsparticles-link]: https://particles.js.org/
[swiper-link]: https://swiperjs.com/
[react-countup-link]: https://www.npmjs.com/package/react-countup
[react-icons-link]: https://react-icons.github.io/react-icons/
[vercel-link]: https://vercel.com/

<!-- Status badges -->
[demo]: https://img.shields.io/badge/🚀%20Live%20Demo-black?style=for-the-badge
[demo-link]: {{DEMO_URL}}
[status]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-repos%2Fmain%2Fdata%2Fportfolio-web-template.json&style=for-the-badge
[status-link]: https://github.com/wrujel/monitor-repos
[deploy]: https://img.shields.io/github/deployments/wrujel/portfolio-web-template/production?style=for-the-badge&label=Deploy
[deploy-link]: https://github.com/wrujel/portfolio-web-template/deployments
[tests]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-tests%2Fmain%2Fdata%2Fportfolio-web-template.json&style=for-the-badge
[tests-link]: https://github.com/wrujel/monitor-tests
