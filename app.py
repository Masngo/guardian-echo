import streamlit as st
import streamlit.components.v1 as components

# Configure Streamlit Page layout for full-screen HUD command center
st.set_page_config(
    page_title="GuardianEcho | Streamlit Command Center",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Read the HTML dashboard file
html_file_path = "apps/dashboard/public/index.html"
try:
    with open(html_file_path, "r", encoding="utf-8") as f:
        html_code = f.read()
    # Embed the HTML/JS application into Streamlit
    components.html(html_code, height=900, scrolling=True)
except FileNotFoundError:
    st.error(f"Error: Could not find dashboard file at {html_file_path}. Please ensure your repo structure is up to date.")

# --- AUDIO / VOICE UNLOCK TOGGLE ---
st.sidebar.markdown("### 🔊 Audio & Voice Control")
if "audio_unlocked" not in st.session_state:
    st.session_state.audio_unlocked = False

if not st.session_state.audio_unlocked:
    if st.sidebar.button("🔔 Enable Voice & Audio Alerts"):
        st.session_state.audio_unlocked = True
        st.sidebar.success("Voice synthesis enabled!")
        st.components.v1.html(
            """
            <script>
                const utterance = new SpeechSynthesisUtterance("Audio unlocked for Guardian Echo.");
                window.speechSynthesis.speak(utterance);
            </script>
            """,
            height=0,
        )
else:
    st.sidebar.markdown("✅ *Voice Synced & Active*")
