import { type RouteConfig, route, layout } from '@react-router/dev/routes';

export default [
  route('/', 'pages/public/index.tsx'),
  layout('layouts/main.tsx', [
    layout('layouts/guest.tsx', [
      route('/auth/sign-in', 'pages/auth/sign-in.tsx'),

      route('/auth/sign-up', 'pages/auth/sign-up.tsx'),
      route('/verify/:token', 'pages/auth/verified.tsx'),
      route('/auth/change-password', 'pages/auth/change-password.tsx'),
      route('/auth/forgot-password', 'pages/auth/forgot-password.tsx'),
      route('/auth/verify-otp', 'pages/auth/verify-otp.tsx'),
      // Public pages
      // route('', 'pages/public/index.tsx'),
      // route('/', 'pages/public/index.tsx'),
      route('/account', 'pages/public/account/index.tsx'),
      route('/profile', 'pages/public/profile/index.tsx'),
      route('blogs', 'pages/public/blog/index.tsx'),
      route('blog/:id', 'pages/public/blog/blog-detail.tsx'),
      // route('blog/:slug', 'pages/public/blog/[slug].tsx'),
      route('contact-us', 'pages/public/contact.tsx'),
      route('about-us', 'pages/public/about.tsx'),
      route('rooms', 'pages/public/rooms/index.tsx'),
      route('room/:id', 'pages/public/rooms/room-detail.tsx'),
      // route('booking', 'pages/public/rooms/BookingPage.tsx'),
    ]),

    // Protected routes: dashboard and other app pages
    layout('layouts/protected.tsx', [
      // route('/', 'pages/Home/Homeview.tsx'),
      route('/search', 'pages/search.tsx'),
      route('booking', 'pages/public/rooms/BookingPage.tsx'),
      route('user-booking', 'pages/public/rooms/user-booking-page.tsx'),
      // route('/dashboard/overview', 'pages/dashboard/overview.tsx'),
      // route('/projects', 'pages/projects/index.tsx'),
      // route('/settings', 'pages/settings/index.tsx'),
    ]),

    // layout('layouts/index.ts', [
    //   route('/about', 'pages/about.tsx'),
    //   route('/terms', 'pages/terms.tsx'),
    // ]),
  ]),
  // route('*', 'pages/404.tsx'),
] satisfies RouteConfig;
