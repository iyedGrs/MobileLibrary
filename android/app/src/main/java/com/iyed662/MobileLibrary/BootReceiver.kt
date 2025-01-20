package com.iyed662.MobileLibrary

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast


class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (Intent) {
            Toast.makeText(context, "Device Booted", Toast.LENGTH_SHORT).show()
            // ...additional code to handle boot completion...
        }
    }
}
