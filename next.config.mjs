/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https', hostname: 'randomuser.me', port: '', pathname: '/api/portraits/**',
        }, {
            protocol: 'https', hostname: 'pagedone.io', port: '', pathname: '/asset/uploads/**',
        }],
    },
};

export default nextConfig;
