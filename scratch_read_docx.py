import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def read_docx(path):
    try:
        if not os.path.exists(path):
            return "File not found: " + path
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.XML(xml_content)
            
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            paragraphs = []
            for p in tree.findall('.//w:p', namespace):
                texts = [node.text for node in p.findall('.//w:t', namespace) if node.text]
                if texts:
                    paragraphs.append(''.join(texts))
            
            return '\n'.join(paragraphs)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        print(read_docx(sys.argv[1]))
    else:
        print("Please provide the path to the docx file.")
