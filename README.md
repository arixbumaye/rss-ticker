# RSS News Ticker

A desktop application that displays RSS feeds in a ticker format. The application allows you to add multiple RSS feeds, which are displayed in separate rows, each scrolling horizontally.

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/bh2qKqcJtf)

## Features

- **Multiple RSS Feeds**: Add and manage multiple RSS feeds
- **Vertical Stacking**: Each feed is displayed in its own row
- **Customizable Speed**: Adjust the scrolling speed (5s to 120s)
- **Adjustable Font Size**: Change the text size for better readability
- **Manual Updates**: The application checks for updates and provides a direct download link
- **Feed Management**: Reorder or remove feeds as needed
- **Persistent Settings**: Your feeds, font size, and speed settings are saved between sessions

## Installation

Download the latest version for your platform from the [releases page](https://github.com/arixbumaye/rss-ticker/releases/latest).

### For macOS Users:

1. **Download the DMG file** only (e.g., `RSS-News-Ticker-1.0.3-arm64.dmg`) - you don't need any of the other files
2. **Open the DMG file** by double-clicking it
3. **Drag the RSS News Ticker app** to your Applications folder
4. **Open the app** from your Applications folder
   - If you get a security warning saying the app "cannot be opened because the developer cannot be verified" or "is damaged and can't be opened", follow these steps:
     1. Open System Preferences (or System Settings on newer macOS)
     2. Go to "Security & Privacy"
     3. Look for a message about RSS News Ticker being blocked
     4. Click "Open Anyway" or "Allow"
     5. Alternatively, right-click (or Control+click) on the app and select "Open", then click "Open" in the dialog that appears
   - If you get a message saying the app "is damaged and should be moved to the Trash", try these steps:
     1. Open Terminal (from Applications > Utilities)
     2. Run this command: `xattr -cr /Applications/RSS\ News\ Ticker.app`
     3. Try opening the app again

### For Windows Users:

1. **Download the EXE installer** only (e.g., `RSS-News-Ticker-Setup-1.0.3.exe`) - you don't need any of the other files
2. **Run the installer** by double-clicking it
3. **Follow the installation wizard** to complete the installation
4. **Launch the app** from your Start menu or desktop shortcut
   - If you get a SmartScreen warning, click "More info" and then "Run anyway"

### Important Notes:

- You only need to download ONE file for installation (the DMG for macOS or the EXE for Windows)
- The other files (blockmap, yml) are used by the auto-update system and don't need to be downloaded manually
- The application will automatically check for updates and notify you when a new version is available
- The application is not code signed, which may trigger security warnings on macOS and Windows

## Usage

1. **Adding Feeds**: Enter an RSS feed URL in the input field and click "Add Feed"
2. **Managing Feeds**: Click "Manage Feeds" to reorder or remove feeds
3. **Adjusting Speed**: Use the "+" and "-" buttons next to "Speed" to adjust scrolling speed
4. **Changing Font Size**: Use the "+" and "-" buttons next to "Font" to adjust text size
5. **Checking for Updates**: Click "Check Updates" to manually check for application updates
   - When an update is available, a notification will appear with a download link
   - Download and install the new version manually

## Support This Project

If you find this application useful, please consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20This%20Project-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/bh2qKqcJtf)

## Development

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Setup

```bash
# Clone the repository
git clone https://github.com/arixbumaye/rss-ticker.git
cd rss-ticker

# Install dependencies
npm install

# Start the application
npm start

# Build the application
npm run build
```

## Version History

- **1.0.3**: Added Windows support and fixed close app button
- **1.0.2**: Improved update notification system with direct download links
- **1.0.1**: Added multiple feed support and 5-second speed option
- **1.0.0**: Initial release

## License

ISC

## Acknowledgments

- Built with Electron
- Uses electron-updater for update notifications 