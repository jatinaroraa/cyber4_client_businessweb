import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Button,
  Input,
  Space,
  Select,
  Divider,
  Typography
} from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

// Modern Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [selectedFontFamily, setSelectedFontFamily] = useState('');
  const [selectedFontSize, setSelectedFontSize] = useState('3');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedBgColor, setSelectedBgColor] = useState('transparent');
  
  // Track format states
  const [formatStates, setFormatStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    bulletList: false,
    numberedList: false
  });

  // Colors palette
  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF',
    '#F3F3F3', '#FFFFFF', '#C00000', '#FF0000', '#FFC000', '#FFFF00', '#92D050', '#00B050',
    '#00B0F0', '#0070C0', '#002060', '#7030A0', '#FF6600', '#FF3399', '#00CCFF', '#33FF00'
  ];

  // Font families
  const fontFamilies = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Comic Sans MS', label: 'Comic Sans MS' }
  ];

  // Font sizes
  const fontSizes = [
    { value: '1', label: '10px' },
    { value: '2', label: '12px' },
    { value: '3', label: '16px' },
    { value: '4', label: '18px' },
    { value: '5', label: '24px' },
    { value: '6', label: '32px' },
    { value: '7', label: '48px' }
  ];

  // Initialize editor
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  // Update format states based on cursor position
  const updateFormatStates = useCallback(() => {
    if (!editorRef.current) return;

    const newStates = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      bulletList: document.queryCommandState('insertUnorderedList'),
      numberedList: document.queryCommandState('insertOrderedList')
    };
    
    setFormatStates(newStates);

    // Get current font family and size
    const fontName = document.queryCommandValue('fontName').replace(/['"]/g, '');
    const fontSize = document.queryCommandValue('fontSize');
    const foreColor = document.queryCommandValue('foreColor');
    const backColor = document.queryCommandValue('backColor');
    
    if (fontName) setSelectedFontFamily(fontName);
    if (fontSize) setSelectedFontSize(fontSize);
    if (foreColor && foreColor !== 'rgb(0, 0, 0)') setSelectedColor(foreColor);
    if (backColor && backColor !== 'transparent') setSelectedBgColor(backColor);
  }, []);

  // Focus handler
  const handleFocus = useCallback(() => {
    setIsEditing(true);
    updateFormatStates();
  }, [updateFormatStates]);

  // Blur handler
  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  // Input handler
  const handleInput = useCallback(() => {
    if (editorRef.current && onChange) {
      const content = editorRef.current.innerHTML;
      onChange(content);
      updateFormatStates();
    }
  }, [onChange, updateFormatStates]);

  // Selection change handler
  useEffect(() => {
    const handleSelectionChange = () => {
      if (isEditing) {
        updateFormatStates();
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isEditing, updateFormatStates]);

  // Execute command wrapper with focus management
  const executeCommand = useCallback((command, showUI = false, value = null) => {
    // Save selection before focus changes
    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    
    // Focus the editor
    if (editorRef.current) {
      editorRef.current.focus();
      
      // Restore selection if it was lost
      if (range && selection.rangeCount === 0) {
        selection.addRange(range);
      }
    }

    // Execute the command
    try {
      document.execCommand(command, showUI, value);
    } catch (e) {
      console.error('Command failed:', command, e);
    }

    // Update the content
    handleInput();
    
    // Keep focus on editor
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [handleInput]);

  // Format commands
  const applyFormat = useCallback((format) => {
    switch(format) {
      case 'bold':
        executeCommand('bold');
        break;
      case 'italic':
        executeCommand('italic');
        break;
      case 'underline':
        executeCommand('underline');
        break;
      case 'bulletList':
        executeCommand('insertUnorderedList');
        break;
      case 'numberedList':
        executeCommand('insertOrderedList');
        break;
      default:
        break;
    }
  }, [executeCommand]);

  // Font family change
  const handleFontFamilyChange = useCallback((fontFamily) => {
    setSelectedFontFamily(fontFamily);
    executeCommand('fontName', false, fontFamily);
  }, [executeCommand]);

  // Font size change
  const handleFontSizeChange = useCallback((fontSize) => {
    setSelectedFontSize(fontSize);
    executeCommand('fontSize', false, fontSize);
  }, [executeCommand]);

  // Color change
  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
    executeCommand('foreColor', false, color);
    setShowColorPicker(false);
  }, [executeCommand]);

  // Background color change
  const handleBgColorChange = useCallback((color) => {
    setSelectedBgColor(color);
    // Try hiliteColor first, fallback to backColor
    if (!document.execCommand('hiliteColor', false, color)) {
      executeCommand('backColor', false, color);
    }
    setShowHighlightPicker(false);
  }, [executeCommand]);

  // Heading commands
  const applyHeading = useCallback((heading) => {
    executeCommand('formatBlock', false, heading);
  }, [executeCommand]);

  // Alignment commands
  const applyAlignment = useCallback((alignment) => {
    executeCommand(alignment);
  }, [executeCommand]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          applyFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          applyFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          applyFormat('underline');
          break;
        default:
          break;
      }
    }

    // Handle Enter in empty list items
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const listItem = range.startContainer.parentElement?.closest('li');
        
        if (listItem && listItem.textContent.trim() === '') {
          e.preventDefault();
          // Exit the list
          const list = listItem.parentElement;
          const p = document.createElement('p');
          p.innerHTML = '<br>';
          list.after(p);
          listItem.remove();
          
          // Move cursor to new paragraph
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          handleInput();
        }
      }
    }

    // Handle Tab in lists for indentation
    if (e.key === 'Tab') {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const listItem = range.startContainer.parentElement?.closest('li');
        
        if (listItem) {
          e.preventDefault();
          executeCommand(e.shiftKey ? 'outdent' : 'indent');
        }
      }
    }
  }, [applyFormat, executeCommand, handleInput]);

  // Color Picker Component
  const ColorPicker = ({ visible, onSelect, onClose, currentColor }) => {
    if (!visible) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          zIndex: 1050,
          background: 'white',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 24px)',
          gap: '4px',
          marginTop: '4px'
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        {colors.map(color => (
          <button
            key={color}
            style={{
              width: '24px',
              height: '24px',
              border: currentColor === color ? '2px solid #1890ff' : '1px solid #d9d9d9',
              background: color,
              cursor: 'pointer',
              borderRadius: '2px',
              padding: 0
            }}
            onClick={() => onSelect(color)}
            onMouseDown={(e) => e.preventDefault()}
          />
        ))}
        <button
          style={{
            gridColumn: 'span 8',
            marginTop: '4px',
            padding: '4px',
            border: '1px solid #d9d9d9',
            background: 'white',
            cursor: 'pointer',
            borderRadius: '2px'
          }}
          onClick={onClose}
          onMouseDown={(e) => e.preventDefault()}
        >
          Close
        </button>
      </div>
    );
  };

  // Toolbar Button Component
  const ToolbarButton = ({ icon, title, active, onClick }) => (
    <Button
      size="small"
      type={active ? 'primary' : 'default'}
      icon={icon}
      title={title}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
    />
  );

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}>
      {/* Toolbar */}
      <div
        style={{
          padding: '8px',
          borderBottom: '1px solid #d9d9d9',
          backgroundColor: '#fafafa',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          alignItems: 'center'
        }}
        onMouseDown={(e) => {
          // Prevent losing focus except for inputs
          if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
            e.preventDefault();
          }
        }}
      >
        {/* Text formatting */}
        <Space size={4}>
          <ToolbarButton
            icon={<BoldOutlined />}
            title="Bold (Ctrl+B)"
            active={formatStates.bold}
            onClick={() => applyFormat('bold')}
          />
          <ToolbarButton
            icon={<ItalicOutlined />}
            title="Italic (Ctrl+I)"
            active={formatStates.italic}
            onClick={() => applyFormat('italic')}
          />
          <ToolbarButton
            icon={<UnderlineOutlined />}
            title="Underline (Ctrl+U)"
            active={formatStates.underline}
            onClick={() => applyFormat('underline')}
          />
        </Space>

        <Divider type="vertical" style={{ margin: '0 8px' }} />

        {/* Font controls */}
        {/* <Select
          size="small"
          style={{ width: 130 }}
          value={selectedFontFamily || 'Arial'}
          onChange={handleFontFamilyChange}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {fontFamilies.map(font => (
            <Select.Option key={font.value} value={font.value}>
              <span style={{ fontFamily: font.value }}>{font.label}</span>
            </Select.Option>
          ))}
        </Select> */}

        {/* <Select
          size="small"
          style={{ width: 80 }}
          value={selectedFontSize}
          onChange={handleFontSizeChange}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {fontSizes.map(size => (
            <Select.Option key={size.value} value={size.value}>
              {size.label}
            </Select.Option>
          ))}
        </Select> */}

        <Divider type="vertical" style={{ margin: '0 8px' }} />

        {/* Color controls */}
        <div style={{ position: 'relative' }}>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowHighlightPicker(false);
            }}
            title="Text Color"
          >
            <span style={{ 
              borderBottom: `3px solid ${selectedColor}`,
              paddingBottom: '2px',
              fontWeight: 'bold'
            }}>
              A
            </span>
          </Button>
          <ColorPicker
            visible={showColorPicker}
            currentColor={selectedColor}
            onSelect={handleColorChange}
            onClose={() => setShowColorPicker(false)}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setShowHighlightPicker(!showHighlightPicker);
              setShowColorPicker(false);
            }}
            title="Highlight Color"
          >
            <span style={{ 
              backgroundColor: selectedBgColor !== 'transparent' ? selectedBgColor : '#ffff00',
              padding: '0 4px',
              borderRadius: '2px'
            }}>
              ab
            </span>
          </Button>
          <ColorPicker
            visible={showHighlightPicker}
            currentColor={selectedBgColor}
            onSelect={handleBgColorChange}
            onClose={() => setShowHighlightPicker(false)}
          />
        </div>

        <Divider type="vertical" style={{ margin: '0 8px' }} />

        {/* Lists */}
        <Space size={4}>
          <ToolbarButton
            icon={<UnorderedListOutlined />}
            title="Bullet List"
            active={formatStates.bulletList}
            onClick={() => applyFormat('bulletList')}
          />
          <ToolbarButton
            icon={<OrderedListOutlined />}
            title="Numbered List"
            active={formatStates.numberedList}
            onClick={() => applyFormat('numberedList')}
          />
        </Space>

        <Divider type="vertical" style={{ margin: '0 8px' }} />

        {/* Headings */}
        <Space size={4}>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyHeading('h1')}
            title="Heading 1"
          >
            H1
          </Button>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyHeading('h2')}
            title="Heading 2"
          >
            H2
          </Button>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyHeading('h3')}
            title="Heading 3"
          >
            H3
          </Button>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyHeading('p')}
            title="Normal"
          >
            ¶
          </Button>
        </Space>

        <Divider type="vertical" style={{ margin: '0 8px' }} />

        {/* Alignment */}
        <Space size={4}>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyAlignment('justifyLeft')}
            title="Align Left"
          >
            ⬅
          </Button>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyAlignment('justifyCenter')}
            title="Center"
          >
            ⬌
          </Button>
          <Button
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyAlignment('justifyRight')}
            title="Align Right"
          >
            ➡
          </Button>
        </Space>
      </div>

      {/* Editor */}
      <div style={{ position: 'relative', minHeight: '200px' }}>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            minHeight: '200px',
            padding: '12px',
            outline: 'none',
            fontSize: '14px',
            lineHeight: '1.6'
          }}
          data-placeholder={placeholder || 'Start typing...'}
        />
        
        {/* Show placeholder */}
        {!isEditing && (!value || value === '<p><br></p>' || value === '') && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              color: '#999',
              pointerEvents: 'none'
            }}
          >
            {placeholder || 'Start typing...'}
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        div[contenteditable] {
          word-break: break-word;
        }
        div[contenteditable]:focus {
          outline: 2px solid #40a9ff;
          outline-offset: -2px;
        }
        div[contenteditable] p {
          margin: 0 0 10px 0;
        }
        div[contenteditable] h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        div[contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        div[contenteditable] h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        div[contenteditable] ul,
        div[contenteditable] ol {
          margin: 10px 0;
          padding-left: 30px;
        }
        div[contenteditable] ul li {
          list-style-type: disc;
        }
        div[contenteditable] ol li {
          list-style-type: decimal;
        }
        div[contenteditable] li {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;