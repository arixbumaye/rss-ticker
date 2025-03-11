# RSS News Ticker

A desktop application that displays RSS feeds in a ticker format. The application allows you to add multiple RSS feeds, which are displayed in separate rows, each scrolling horizontally.

## Features

- **Multiple RSS Feeds**: Add and manage multiple RSS feeds
- **Vertical Stacking**: Each feed is displayed in its own row
- **Customizable Speed**: Adjust the scrolling speed (5s to 120s)
- **Adjustable Font Size**: Change the text size for better readability
- **Manual Updates**: The application checks for updates and provides a direct download link
- **Feed Management**: Reorder or remove feeds as needed
- **Persistent Settings**: Your feeds, font size, and speed settings are saved between sessions

## Installation

Download the latest version for your platform:

- [macOS](https://github.com/arixbumaye/rss-ticker/releases/latest)
- [Windows](https://github.com/arixbumaye/rss-ticker/releases/latest)

## Usage

1. **Adding Feeds**: Enter an RSS feed URL in the input field and click "Add Feed"
2. **Managing Feeds**: Click "Manage Feeds" to reorder or remove feeds
3. **Adjusting Speed**: Use the "+" and "-" buttons next to "Speed" to adjust scrolling speed
4. **Changing Font Size**: Use the "+" and "-" buttons next to "Font" to adjust text size
5. **Checking for Updates**: Click "Check Updates" to manually check for application updates
   - When an update is available, a notification will appear with a download link
   - Download and install the new version manually

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