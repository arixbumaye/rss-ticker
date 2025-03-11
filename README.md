# RSS News Ticker

A desktop application that displays RSS feeds in a ticker format. Each feed is displayed in its own row, with the oldest feed at the top and newest at the bottom.

## Features

- **Multiple RSS Feeds**: Add and manage multiple RSS feeds
- **Vertical Layout**: Each feed gets its own dedicated ticker row
- **Customizable Speed**: Adjust how fast the news items scroll (from 5 to 120 seconds)
- **Adjustable Font Size**: Change the text size to your preference
- **Feed Management**: Reorder, add, or remove feeds easily
- **Auto-Updates**: The application automatically checks for and installs updates

## Installation

Download the latest version from the [Releases](https://github.com/arixbumaye/rss-newsfeed/releases) page.

### macOS

1. Download the `.dmg` file
2. Open the DMG file and drag the application to your Applications folder
3. Right-click the app and select "Open" (required the first time due to security settings)

### Windows

1. Download the `.exe` installer
2. Run the installer and follow the prompts
3. The application will be installed and added to your Start menu

## Usage

1. **Adding Feeds**: Enter an RSS feed URL in the input field and click "Add Feed"
2. **Managing Feeds**: Click "Manage Feeds" to reorder or remove feeds
3. **Adjusting Speed**: Use the "+" and "-" buttons next to "Speed" to change scrolling speed
4. **Changing Font Size**: Use the "+" and "-" buttons next to "Font" to adjust text size
5. **Checking for Updates**: Click "Check Updates" to manually check for new versions

## Auto-Update

The application automatically checks for updates when it starts. When an update is available:

1. It will be downloaded in the background
2. A notification will appear when the download is complete
3. The update will be installed when you restart the application

## Development

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Setup

```bash
# Clone the repository
git clone https://github.com/arixbumaye/rss-newsfeed.git
cd rss-newsfeed

# Install dependencies
npm install

# Start the application
npm start

# Build the application
npm run build
```

## License

ISC 