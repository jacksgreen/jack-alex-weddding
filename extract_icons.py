from PIL import Image
import os

def extract_icons(image_path, output_dir):
    try:
        img = Image.open(image_path)
        # The image is likely the full screenshot or a crop of the dock.
        # Based on the user's upload, it looks like a crop of the dock area.
        
        # We can try to find the icons by looking for non-background pixels.
        # The background seems to be a solid cream color (or similar).
        # Let's assume the icons are roughly equally spaced.
        
        # First, let's define the approximate regions based on visual inspection of a typical dock
        # or we can just slice the image into N parts if we know the number of icons.
        # In the provided image (Step 217), there are 9 icons.
        
        width, height = img.size
        num_icons = 9
        icon_width = width // num_icons
        
        icons = [
            ("player", 0),
            ("newsroom", 1),
            ("mixtapes", 2),
            ("members", 3),
            ("events", 4),
            ("instagram", 5),
            ("vacation", 6),
            ("guestbook", 7),
            ("settings", 8)
        ]
        
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        for name, index in icons:
            left = index * icon_width
            right = (index + 1) * icon_width
            # Crop the full height of the strip
            icon_crop = img.crop((left, 0, right, height))
            
            # Now we want to trim the whitespace (cream background)
            # We can do this by finding the bounding box of non-background pixels
            # But first we need to know the background color.
            # Let's assume the top-left pixel is background.
            bg_color = icon_crop.getpixel((0, 0))
            
            # Create a mask where pixels matching bg_color are transparent
            icon_crop = icon_crop.convert("RGBA")
            datas = icon_crop.getdata()
            new_data = []
            
            # Tolerance for background color matching
            tol = 10
            
            for item in datas:
                if abs(item[0] - bg_color[0]) < tol and abs(item[1] - bg_color[1]) < tol and abs(item[2] - bg_color[2]) < tol:
                    new_data.append((255, 255, 255, 0))
                else:
                    new_data.append(item)
            
            icon_crop.putdata(new_data)
            
            # Now crop to content
            bbox = icon_crop.getbbox()
            if bbox:
                icon_crop = icon_crop.crop(bbox)
            
            output_path = os.path.join(output_dir, f"{name}.png")
            icon_crop.save(output_path)
            print(f"Saved {name} to {output_path}")

    except Exception as e:
        print(f"Error processing image: {e}")

# Path to the uploaded image from Step 217
input_image = "/Users/jackgreen/.gemini/antigravity/brain/bd8d1ad9-2122-4aa9-9b82-03fe963533c5/uploaded_image_1763805701583.png"
output_directory = "public/icons/poolsuite"

extract_icons(input_image, output_directory)
