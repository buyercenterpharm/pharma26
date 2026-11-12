"""Build a stylized land mask from Natural Earth public-domain GeoJSON.
Usage: python3 scripts/create-globe-texture.py /path/to/ne_110m_land.geojson
Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson
Requires Pillow for this optional asset-generation step, not at runtime.
"""
import json, sys
from pathlib import Path
from PIL import Image, ImageDraw
size=(2048,1024)
im=Image.new('RGB',size,(16,31,48)); mask=Image.new('L',size,0)
draw=ImageDraw.Draw(im); relief=ImageDraw.Draw(mask)
for feature in json.load(open(sys.argv[1]))['features']:
    geo=feature['geometry']; polygons=geo['coordinates'] if geo['type']=='MultiPolygon' else [geo['coordinates']]
    for polygon in polygons:
        for index,ring in enumerate(polygon):
            points=[((lon+180)/360*size[0],(90-lat)/180*size[1]) for lon,lat,*_ in ring]
            draw.polygon(points, fill=(109,105,88) if index==0 else (16,31,48))
            relief.polygon(points, fill=155 if index==0 else 0)
output=Path(__file__).resolve().parents[1]/'public/textures'
im.save(output/'earth-land.webp',quality=92)
mask.save(output/'earth-relief.png',optimize=True)
