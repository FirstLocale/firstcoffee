from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time

# Define options for running ChromeDriver
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=1920,1080")  # Set a reasonable window size

# Initialize a new Chrome driver instance
driver = webdriver.Chrome(options=chrome_options)

# Set global wait time
WAIT_TIME = 10  # seconds

def check_page_elements(url, selectors=None):
    """
    Check if elements exist on a page and capture their text content
    
    Args:
        url: URL to test
        selectors: Dictionary of {element_name: selector} to check
    """
    if selectors is None:
        selectors = {'h1': '//h1', 'paragraph': '//p'}
    
    print(f"\nTesting page: {url}")
    driver.get(url)
    
    # Wait for page to fully load
    time.sleep(2)  # Give React/Next.js some time to hydrate components
    
    # Check each selector
    for name, selector in selectors.items():
        try:
            # Wait for element to be present
            element = WebDriverWait(driver, WAIT_TIME).until(
                EC.presence_of_element_located((By.XPATH, selector))
            )
            print(f"✓ Found {name}: {element.text[:50]}{'...' if len(element.text) > 50 else ''}")
            
            # Optional: Take screenshot if you need visual verification
            # driver.save_screenshot(f"{url.replace('://', '_').replace('/', '_')}_{name}.png")
            
        except TimeoutException:
            print(f"✗ Could not find {name} using selector: {selector}")
            # Take screenshot on failure to help debug
            print(driver.page_source)
            driver.save_screenshot(f"error_{url.replace('://', '_').replace('/', '_')}.png")
        except Exception as e:
            print(f"✗ Error checking {name}: {e}")

# Pages to test with more specific selectors
pages_to_test = [
    {
        "url": "https://www.example.com/",
        "selectors": {"h1": "//h1"}
    },
    {
        "url": "http://localhost:3000",
        "selectors": {
            "h1": "//h1[contains(@class, 'text-xl') and contains(@class, 'font-bold')]",
            "text": "//p[contains(@class, 'text-sm')]",
            "image": "//img[contains(@alt, 'straight outta clopton')]"
        }
    },
    {
        "url": "http://localhost:3000/about",
        "selectors": {"h1": "//h1", "paragraph": "//p"}
    },
    {
        "url": "http://localhost:3000/contact",
        "selectors": {"h1": "//h1", "paragraph": "//p"}
    },
    {
        "url": "http://localhost:3000/events",
        "selectors": {"h1": "//h1", "paragraph": "//p"}
    },
    {
        "url": "http://localhost:3000/menus",
        "selectors": {"h1": "//h1", "paragraph": "//p"}
    }
]

try:
    # Loop through each page and check elements
    for page in pages_to_test:
        check_page_elements(page["url"], page["selectors"])
        
    print("\nAll tests completed!")
finally:
    # Always quit the driver
    driver.quit()