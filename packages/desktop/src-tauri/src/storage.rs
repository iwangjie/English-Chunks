use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

fn get_storage_path(app: &tauri::AppHandle, key: &str) -> PathBuf {
    let app_data_dir = app.path().app_data_dir().expect("Failed to get app data dir");
    app_data_dir.join(format!("{}.json", key))
}

#[derive(Serialize, Deserialize)]
struct StorageValue {
    value: String,
}

#[tauri::command]
pub fn get_item(app: tauri::AppHandle, key: String) -> Option<String> {
    let path = get_storage_path(&app, &key);
    if path.exists() {
        match fs::read_to_string(&path) {
            Ok(content) => {
                match serde_json::from_str::<StorageValue>(&content) {
                    Ok(storage) => Some(storage.value),
                    Err(_) => None,
                }
            }
            Err(_) => None,
        }
    } else {
        None
    }
}

#[tauri::command]
pub fn set_item(app: tauri::AppHandle, key: String, value: String) -> Result<(), String> {
    let path = get_storage_path(&app, &key);
    let storage = StorageValue { value };
    let content = serde_json::to_string(&storage).map_err(|e| e.to_string())?;
    fs::write(&path, content).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn remove_item(app: tauri::AppHandle, key: String) -> Result<(), String> {
    let path = get_storage_path(&app, &key);
    if path.exists() {
        fs::remove_file(&path).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub fn clear_storage(app: tauri::AppHandle) -> Result<(), String> {
    let app_data_dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    if app_data_dir.exists() {
        for entry in fs::read_dir(&app_data_dir).map_err(|e| e.to_string())? {
            let entry = entry.map_err(|e| e.to_string())?;
            let path = entry.path();
            if path.extension().map_or(false, |ext| ext == "json") {
                fs::remove_file(&path).map_err(|e| e.to_string())?;
            }
        }
    }
    Ok(())
}
