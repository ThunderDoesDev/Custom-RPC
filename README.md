
# Discord RPC Client

This project is a Node.js application that sets up and manages a Discord Rich Presence (RPC) client with custom activities. The activities can be customized to show different states and information on your Discord profile.

## Features

- Customizable activities with large and small images.
- Automatic activity rotation.
- Retry logic for setting activities and logging in.
- Graceful shutdown handling.
- Simple logging system.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or later)
- A Discord application with a client ID. You can create one [here](https://discord.com/developers/applications).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/discord-rpc-client.git
    cd discord-rpc-client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Update the `config.json` file in the `Settings` directory with your Discord client ID and desired status timeout:

    ```json
    {
      "client_id": "YOUR_DISCORD_CLIENT_ID",
      "status_timeout": 15000
    }
    ```

    Replace `YOUR_DISCORD_CLIENT_ID` with your actual Discord client ID.

4. Add your image assets to your Discord application under the "Rich Presence" section, and update the `largeImageKey`, `smallImageKey`, and other related fields in the activities array.

## Usage

Run the application with the following command:

```bash
node index.js
```

The client will log in to Discord and start rotating through the defined activities.

## Customization

### Activities

You can customize the activities in the `index.js` file. The `activities` array contains multiple activity objects that you can modify. Each activity can have:

- `details`: A short description of what you are doing.
- `state`: The current state of your activity.
- `startTimestamp`: A timestamp for when the activity started.
- `largeImageKey` and `largeImageText`: Key and text for the large image.
- `smallImageKey` and `smallImageText`: Key and text for the small image.
- `instance`: Whether this activity is an instance.
- `buttons`: An array of buttons with `label` and `url`.

### Logging

The logging functionality uses a custom logger module. Modify the `logger` module in the `Functions` directory to change how logging is handled.

### Error Handling

Error handling is managed by the `errors` module in the `Functions` directory. Customize this module to handle errors as needed.

## License

This source code is available for educational purposes only under a strict non-commercial, non-distribution license. All rights are reserved.

Feel free to learn from and experiment with the code, but please respect the terms of use.

## Acknowledgments

- [discord-rpc](https://github.com/discordjs/RPC) for the Discord RPC client.
- [cfonts](https://github.com/dominikwilkowski/cfonts) for the fancy console fonts.

## Support

For support, issues, or enhancements, please open an issue in this repository or join our discord support server.

[Join Support Server](https://discord.gg/thunderstruck)
