const RPC = require('discord-rpc');
const config = require('./Settings/config.json');
const logger = require('./Functions/logger');
const errors = require('./Functions/errors');
const rpc = new RPC.Client({
    transport: 'ipc'
});
const cfonts = require('cfonts');

const activities = [{
        details: 'Developing a Discord RPC',
        state: 'In the zone',
        startTimestamp: new Date(),
        largeImageKey: 'large-image', // Add your large image key
        largeImageText: 'Large Image Text',
        smallImageKey: 'small-image', // Add your small image key
        smallImageText: 'Small Image Text',
        instance: false,
        buttons: [{
                label: 'Join us',
                url: 'https://discord.com/invite/your-invite-link'
            },
            {
                label: 'Learn More',
                url: 'https://example.com'
            }
        ]
    },
    {
        details: 'Reviewing Code',
        state: 'Deep Focus',
        startTimestamp: new Date(),
        largeImageKey: 'review-image', // Add your large image key
        largeImageText: 'Review Image Text',
        smallImageKey: 'focus-image', // Add your small image key
        smallImageText: 'Focus Image Text',
        instance: false,
        buttons: [{
                label: 'Documentation',
                url: 'https://example-docs.com'
            },
            {
                label: 'Support',
                url: 'https://support.example.com'
            }
        ]
    }
];

function setActivities() {
    let index = 0;
    const updateActivity = () => {
        if (index < activities.length) {
            rpc.setActivity(activities[index])
                .then(() => {
                    if (activities.length > 1) {
                        logger.log('PRESENCES', `Updated to activity ${index + 1}.`);
                    } else {
                        logger.log('PRESENCE', `Updated to the only activity.`);
                    }
                    index++;
                    setTimeout(updateActivity, config.status_timeout);
                })
                .catch((error) => {
                    logger.error('RPC Error', `Failed to set activity ${index + 1}.`);
                    errors(rpc, error.stack);
                    if (retryCount < maxRetries) {
                        logger.error('RPC Error', `Retrying to set activity ${index + 1} (${retryCount + 1}/${maxRetries}).`);
                        setTimeout(() => setActivities(retryCount + 1), 5000);
                    } else {
                        logger.error('RPC Error', `Max retries reached for activity ${index + 1}. Skipping to the next activity.`);
                        index++;
                        setTimeout(updateActivity, config.status_timeout);
                    }
                });
        } else {
            index = 0;
            setTimeout(updateActivity, config.status_timeout);
        }
    };
    updateActivity();
}

function loginRpc(retryCount = 0) {
    const maxRetries = 3;
    rpc.login({
            clientId: config.client_id
        })
        .catch((error) => {
            logger.error('RPC Error', 'Failed to login to RPC.');
            errors(rpc, error.stack);
            if (retryCount < maxRetries) {
                logger.error('RPC Error', `Retrying login (${retryCount + 1}/${maxRetries}).`);
                setTimeout(() => loginRpc(retryCount + 1), 5000);
            } else {
                logger.error('RPC Error', 'Max retries reached for login. Exiting.');
                process.exit(1);
            }
        });
}

rpc.on('ready', () => {
    const banner = cfonts.render((`RPC Client\nby ThunderDoesDev`), {
        font: 'chrome',
        color: 'candy',
        align: 'center',
        gradient: ["red", "magenta"],
        lineHeight: 1
    });
    console.log(banner.string);
    logger.log('WHO AM I', `Logged In As ${rpc.user.username}`);
    logger.log("CONNECTED", "Connected To Discord's RPC Gateway");
    setActivities();
});

rpc.on('disconnected', () => {
    logger.error('RPC Client has been disconnected. Attempting to reconnect...');
    setTimeout(loginRpc, config.status_timeout);
});

process.on('SIGINT', () => {
    logger.error('RPC Error', `Shutting down gracefully.`);
    rpc.destroy()
        .then(() => {
            logger.error('RPC Error', `RPC client destroyed.`);
            process.exit(0);
        })
        .catch((error) => {
            errors(rpc, error.stack);
            logger.error('RPC Error', `Failed to destroy RPC client.`);
            process.exit(1);
        });
});

loginRpc();