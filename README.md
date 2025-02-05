# MC Tools

A comprehensive collection of essential tools for Minecraft players. This web application provides various utilities to enhance your Minecraft gameplay experience.

## Features

- **Server Status Checker**: Check the status of any Minecraft server in real-time
- **Stronghold Finder**: Calculate stronghold locations using ender eye throws
- **Nether Calculator**: Convert coordinates between Overworld and Nether dimensions
- **Player Info**: View player information, UUID, and skin renders

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Firebase Analytics
- Lucide Icons

## API Credits & Resources

- [Ashcon API](https://github.com/Electroid/mojang-api) - Player data and UUID lookup
- [Mineatar API](https://github.com/mineatar/api) - Skin rendering service
- [MCStatus API](https://api.mcstatus.io/) - Server status information
- [Minecraft Font](https://github.com/South-Paw/typeface-minecraft) - Official Minecraft font typeface

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/byteflipper-58/mc-tools.git
```

2. Install dependencies:
```bash
cd mc-tools
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration details

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

6. Deploy to Firebase:
```bash
npm run deploy
```

## Environment Variables

The following environment variables are required:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## API Usage

The application uses the following APIs:

- **Ashcon API**
  - Purpose: Player data and UUID lookup
  - Documentation: [GitHub Repository](https://github.com/Electroid/mojang-api)
  - Endpoint: `https://api.ashcon.app/mojang/v2/user/`

- **Mineatar API**
  - Purpose: Skin rendering
  - Documentation: [GitHub Repository](https://github.com/mineatar/api)
  - Endpoint: `https://api.mineatar.io/`

- **MCStatus API**
  - Purpose: Server status information
  - Documentation: [API Documentation](https://api.mcstatus.io/)
  - Endpoint: `https://api.mcstatus.io/v2/status/java/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Developer

Developed by ByteFlipper

- GitHub: [byteflipper-58](https://github.com/byteflipper-58)
- Repository: [mc-tools](https://github.com/byteflipper-58/mc-tools)

## Acknowledgments

- Minecraft® is a registered trademark of Mojang AB
- Thanks to the Mineatar API for providing skin rendering services
- Thanks to the MCStatus API for server status information
- Thanks to Ashcon API for player data services