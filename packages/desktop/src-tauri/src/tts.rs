use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct TTSOptions {
    pub voice: Option<String>,
    pub speed: Option<f32>,
    pub pitch: Option<f32>,
    pub volume: Option<f32>,
}

#[derive(Serialize, Deserialize)]
pub struct Voice {
    pub id: String,
    pub name: String,
}

// Note: For full native TTS support, you would need to add the `tts` crate
// and implement platform-specific TTS. For now, we provide a stub implementation
// that can be enhanced later.

#[tauri::command]
pub fn speak(_text: String, _options: Option<TTSOptions>) -> Result<(), String> {
    // TODO: Implement native TTS using the `tts` crate
    // For now, the frontend will fall back to browser TTS or OpenAI TTS
    Ok(())
}

#[tauri::command]
pub fn stop_speaking() -> Result<(), String> {
    // TODO: Implement stop functionality
    Ok(())
}

#[tauri::command]
pub fn get_voices() -> Vec<Voice> {
    // TODO: Return available system voices
    // For now, return an empty list and let frontend use browser voices
    vec![]
}
