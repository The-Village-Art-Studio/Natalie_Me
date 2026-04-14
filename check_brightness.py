from PIL import Image
import sys

def get_brightness(image_path):
    try:
        img = Image.open(image_path).convert('L')
        # Calculate average pixel value (0-255)
        pixels = list(img.getdata())
        avg = sum(pixels) / len(pixels)
        print(f"Average brightness of {image_path}: {avg:.2f} (0=black, 255=white)")
    except Exception as e:
        print(f"Error: {e}")

get_brightness('./public/backgrounds/fabric.jpg')
