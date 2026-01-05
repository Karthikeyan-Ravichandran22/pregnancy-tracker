# How to Deploy Your Pregnancy Tracker on Railway

## 1. Setup Data Persistence (Critical)
Since you asked to "store this information somewhere" where it won't be lost on updates:
1.  Go to your **Railway Dashboard**.
2.  Click **New Project** > **Deploy from GitHub repo** (Upload this folder to GitHub first).
3.  Once the service is created, click on it and go to the **Volumes** tab.
4.  Click **Add Volume**.
5.  IMPORTANT: Set the **Mount Path** to `/app/data`.
    *   This tells Railway: "Save everything in the `/app/data` folder to a permanent hard drive."
    *   If you don't do this, your data receives a reset every time you update the site.

## 2. Syncing Across Devices
*   Once deployed, the app will auto-sync.
*   Log in on your **Laptop**: Check 'Thyroid'.
*   Open the site on your **Phone**: Refresh, and 'Thyroid' will be checked there too!

## 3. Updates
*   Whenever you want to change the UI or Menu, just edit the code on your laptop and push to GitHub.
*   Railway will auto-deploy the change.
*   Your data (checkboxes, weight logs) **will be safe** because it lives in the separate Volume you attached.
