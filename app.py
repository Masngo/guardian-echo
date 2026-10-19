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
