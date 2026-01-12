// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod storage;
mod tts;

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![
            storage::get_item,
            storage::set_item,
            storage::remove_item,
            storage::clear_storage,
            tts::speak,
            tts::stop_speaking,
            tts::get_voices,
        ])
        .setup(|app| {
            // Create app data directory if it doesn't exist
            let app_data_dir = app.path().app_data_dir().expect("Failed to get app data dir");
            std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data dir");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
