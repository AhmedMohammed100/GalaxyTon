from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler

# Define the /start command handler
async def start(update: Update, context):
    await update.message.reply_text("Hello! Welcome to the bot.")

# Main function to set up the bot
async def main():
    # Create the application object with your bot's token
    application = ApplicationBuilder().token("7449510528:AAFSlKr5wo2llTPxAECeu7cKDL_THm0S7jE").build()

    # Add a handler for the /start command
    start_handler = CommandHandler("start", start)
    application.add_handler(start_handler)

    # Initialize the application
    await application.initialize()

    # Start polling for updates
    await application.start()

    # Keep the application running until manually stopped
    await application.stop()  # Gracefully stop the application
    await application.shutdown()  # Shutdown the application

if __name__ == "__main__":
    import asyncio
    # Run the async event loop using asyncio.run()
    asyncio.run(main())

