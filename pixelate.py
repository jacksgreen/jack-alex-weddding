from PIL import Image
import sys

def pixelate(input_path, output_path, pixel_size=4):
    try:
        img = Image.open(input_path)
        
        # Crop the left 40% to remove the text (assuming text is on the left as per user image)
        # The couple is on the right.
        width, height = img.size
        left = int(width * 0.4)
        img = img.crop((left, 0, width, height))
        
        # Resize down
        small_width = img.width // pixel_size
        small_height = img.height // pixel_size
        small_img = img.resize((small_width, small_height), resample=Image.BILINEAR)
        
        # Resize up with NEAREST to get pixelated look
        result = small_img.resize(img.size, resample=Image.NEAREST)
        
        # Optional: Add some retro color grading (simple quantization)
        result = result.quantize(colors=64).convert('RGB')
        
        result.save(output_path)
        print(f"Pixelated image saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python pixelate.py <input_path> <output_path>")
    else:
        pixelate(sys.argv[1], sys.argv[2], pixel_size=8)
