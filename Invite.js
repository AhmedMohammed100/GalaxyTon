$(document).ready(function () {
    $(".menu-links li a").click(function (e) {
      $(".menu-links li.active").removeClass("active");
      var $parent = $(this).parent();
      $parent.addClass("active");
    });
    $(".hamburger-icon").click(function () {
      $(".menu-links").toggleClass("left");
    });
    $(".hamburger-icon").click(function () {
      $(this).toggleClass("ham-style");
    });
    const themeSwitch = document.querySelector("#checkbox");
    themeSwitch.addEventListener("change", () => {
      document.body.classList.toggle("dark-theme");
    });
})
// Function to generate a random invite code
function generateInviteCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let inviteCode = '';
    for (let i = 0; i < 8; i++) {
        inviteCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return inviteCode;
}

// Function to update invite link
function updateInviteLink() {
    const baseBotLink = "https://t.me/TherealBigFarmBot/b_igfarm";
    
    // Check if the invite code is already stored in localStorage
    let inviteCode = localStorage.getItem("inviteCode");

    // If no invite code is found, generate a new one and store it
    if (!inviteCode) {
        inviteCode = generateInviteCode();
        localStorage.setItem("inviteCode", inviteCode);
    }

    // Create the invite link with the stored or newly generated invite code
    const inviteLink = `${baseBotLink}?invite=${inviteCode}`;
    
    // Update the invite link on the page
    document.getElementById("invite-link").innerText = inviteLink;

    // Set the invite link for Telegram and WhatsApp buttons
    document.getElementById("telegram-btn").onclick = () => {
        window.open(inviteLink, '_blank');
    };
    document.getElementById("whatsapp-btn").onclick = () => {
        const whatsappLink = `https://wa.me/?text=Join%20Big%20Farm%20via%20this%20link%3A%20${encodeURIComponent(inviteLink)}`;
        window.open(whatsappLink, '_blank');
    };
}

// Function to copy invite link to clipboard
function copyLink() {
    const inviteLink = document.getElementById("invite-link").innerText;
    navigator.clipboard.writeText(inviteLink).then(() => {
        alert("Invite link copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy invite link.");
    });
}

// Generate and display the invite link when the page loads
document.addEventListener('DOMContentLoaded', updateInviteLink);
