from os import name
from telegram import Update
from telegram.ext import Application, CommandHandler

BOT_TOKEN = '7449510528:AAFSlKr5wo2llTPxAECeu7cKDL_THm0S7jE'
WEBAPP_URL = 'https://ahmedmohammed100.github.io/GalaxyTon/'

# Define the /start command
async def start(update: Update, context):
    await update.message.reply_text('Hello! I am your bot.')

def main():
    # Initialize the application
    application = Application.builder().token(BOT_TOKEN).build()

    # Add handlers
    application.add_handler(CommandHandler("start", start))

    # Start the bot
    application.run_polling()

if name == 'main':
    main()