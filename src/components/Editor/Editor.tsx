import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ChevronDown } from 'lucide-react'
import {
    UndoIcon,
    RedoIcon,
    ToolbarBoldIcon,
    ToolbarItalicIcon,
    ToolbarUnderlineIcon,
    ToolbarStrikeIcon,
    ToolbarColorBoxIcon,
    ToolbarTextIcon,
    ToolbarLinkIcon,
    ToolbarImageIcon,
    ToolbarEraserIcon,
    ToolbarArrowIcon,
    ToolbarListGroupIcon,
    ToolbarAlignLeftIcon,
    ToolbarAlignCenterIcon,
    ToolbarAlignRightIcon,
    ToolbarAlignJustifyIcon,
    ToolbarLineHeightIcon,
    ToolbarOutdentIcon,
    ToolbarIndentIcon,
} from '../../assets/images/icons/CustomIcons'

interface EditorProps {
    value: string
    onChange: (value: string) => void
}

function getSelectionInfo(textarea: HTMLTextAreaElement) {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const value = textarea.value
    const selectedText = value.substring(start, end)
    return { start, end, value, selectedText }
}

function replaceInfo(
    textarea: HTMLTextAreaElement,
    text: string,
    start: number,
    end: number,
    cursorInfo?: { newStart?: number; newEnd?: number }
) {
    const original = textarea.value
    const newValue = original.substring(0, start) + text + original.substring(end)

    return {
        value: newValue,
        newSelectionStart: cursorInfo?.newStart ?? start + text.length,
        newSelectionEnd: cursorInfo?.newEnd ?? start + text.length,
    }
}

export default function Editor({ value, onChange }: EditorProps) {
    // --- UI ---
    const [isFontSizeMenuOpen, setIsFontSizeMenuOpen] = useState(false)
    const [isTextColorMenuOpen, setIsTextColorMenuOpen] = useState(false)
    const [isListMenuOpen, setIsListMenuOpen] = useState(false)
    const [currentFontSize, setCurrentFontSize] = useState('16')
    const [currentTextColor, setCurrentTextColor] = useState('')

    // --- Refs ---
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fontSizeRef = useRef<HTMLDivElement>(null)
    const textColorRef = useRef<HTMLDivElement>(null)
    const listMenuRef = useRef<HTMLDivElement>(null)
    const objectUrlsRef = useRef<string[]>([])

    const [historyStack, setHistoryStack] = useState<string[]>([value])
    const [historyIndex, setHistoryIndex] = useState(0)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                fontSizeRef.current &&
                !fontSizeRef.current.contains(event.target as Node)
            ) {
                setIsFontSizeMenuOpen(false)
            }
            if (
                textColorRef.current &&
                !textColorRef.current.contains(event.target as Node)
            ) {
                setIsTextColorMenuOpen(false)
            }
            if (
                listMenuRef.current &&
                !listMenuRef.current.contains(event.target as Node)
            ) {
                setIsListMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const pushToHistory = useCallback(
        (newContent: string) => {
            if (newContent === historyStack[historyIndex]) return

            const newHistory = historyStack.slice(0, historyIndex + 1)
            newHistory.push(newContent)

            if (newHistory.length > 50) {
                newHistory.shift()
            }

            setHistoryStack(newHistory)
            setHistoryIndex(newHistory.length - 1)
        },
        [historyStack, historyIndex]
    )

    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevContent = historyStack[historyIndex - 1]
            setHistoryIndex(historyIndex - 1)
            onChange(prevContent)
        }
    }

    const handleRedo = () => {
        if (historyIndex < historyStack.length - 1) {
            const nextContent = historyStack[historyIndex + 1]
            setHistoryIndex(historyIndex + 1)
            onChange(nextContent)
        }
    }

    const updateContent = (newContent: string, saveToHistory = true) => {
        onChange(newContent)
        if (saveToHistory) {
            pushToHistory(newContent)
        }
    }

    const applyParams = (
        transform: (
            sel: string,
            all: string,
            start: number,
            end: number
        ) => { text: string; cursorOffset?: number; selectLength?: number }
    ) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const { start, end, selectedText } = getSelectionInfo(textarea)
        const { text, cursorOffset, selectLength } = transform(
            selectedText,
            textarea.value,
            start,
            end
        )

        const result = replaceInfo(textarea, text, start, end)

        updateContent(result.value, true)

        setTimeout(() => {
            textarea.focus()
            const newCursorStart = start + (cursorOffset ?? text.length)
            const newCursorEnd =
                selectLength !== undefined
                    ? newCursorStart + selectLength
                    : newCursorStart
            textarea.selectionStart = newCursorStart
            textarea.selectionEnd = newCursorEnd
        }, 0)
    }

    // --- 툴바 핸들러 ---

    const toggleWrapper = (
        prefix: string,
        suffix: string,
        placeholder = 'text'
    ) => {
        applyParams((sel) => {
            if (sel.startsWith(prefix) && sel.endsWith(suffix)) {
                return {
                    text: sel.slice(prefix.length, -suffix.length),
                    selectLength: sel.length - prefix.length - suffix.length,
                    cursorOffset: 0,
                }
            }

            const content = sel || placeholder
            return {
                text: `${prefix}${content}${suffix}`,
                selectLength: content.length,
                cursorOffset: prefix.length,
            }
        })
    }

    const handleBold = () => toggleWrapper('**', '**', 'Bold text')
    const handleItalic = () => toggleWrapper('*', '*', 'Italic text')
    const handleUnderline = () => toggleWrapper('<u>', '</u>', 'Underlined text')
    const handleStrikethrough = () =>
        toggleWrapper('~~', '~~', 'Strikethrough text')

    // 폰트사이즈 , 컬러
    const handleFontSize = (size: string) => {
        setCurrentFontSize(size)
        toggleWrapper(`<span style="font-size:${size}px">`, '</span>', 'Text')
        setIsFontSizeMenuOpen(false)
    }

    const handleTextColor = (color: string) => {
        setCurrentTextColor(color)
        toggleWrapper(`<span style="color:${color}">`, '</span>', 'Color Text')
        setIsTextColorMenuOpen(false)
    }

    // 링크
    const handleLink = () => {
        const url = window.prompt('URL을 입력하세요:', 'https://')
        if (!url) return

        applyParams((sel) => {
            const text = sel || 'Link text'
            return {
                text: `[${text}](${url})`,
                selectLength: text.length,
                cursorOffset: 1,
            }
        })
    }

    // 이미지
    const handleImageClick = () => {
        fileInputRef.current?.click()
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        objectUrlsRef.current.push(url)

        applyParams(() => {
            const alt = file.name
            return {
                text: `![${alt}](${url})`,
                cursorOffset: 0,
                selectLength: 0,
            }
        })

        e.target.value = ''
    }

    const toggleLinePrefix = (prefix: string) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const { start, end, value } = getSelectionInfo(textarea)
        let lineStart = value.lastIndexOf('\n', start - 1) + 1
        let lineEnd = value.indexOf('\n', end)
        if (lineEnd === -1) lineEnd = value.length

        const linesContent = value.substring(lineStart, lineEnd)
        const lines = linesContent.split('\n')

        const newLines = lines.map((line) => {
            if (line.startsWith(prefix)) {
                return line.substring(prefix.length)
            } else {
                return prefix + line
            }
        })

        const newText = newLines.join('\n')

        replaceInfo(textarea, newText, lineStart, lineEnd)
        const res = replaceInfo(textarea, newText, lineStart, lineEnd)
        updateContent(res.value)

        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(lineStart, lineStart + newText.length)
        }, 0)
    }

    const handleOrderedList = () => {
        toggleLinePrefix('1. ')
        setIsListMenuOpen(false)
    }
    const handleUnorderedList = () => {
        toggleLinePrefix('- ')
        setIsListMenuOpen(false)
    }

    const handleAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
        toggleWrapper(`<div align="${align}">`, '</div>', 'Content')
    }

    const handleLineHeight = () => {
        const height = window.prompt('행간을 입력하세요 (예: 1.5, 200%)', '1.5')
        if (!height) return
        toggleWrapper(
            `<div style="line-height:${height}">`,
            '</div>',
            'Line Height Content'
        )
    }

    const handleIndent = () => toggleLinePrefix('> ')

    const handleOutdent = () => {
        const textarea = textareaRef.current
        if (!textarea) return

        const { start, end, value } = getSelectionInfo(textarea)
        let lineStart = value.lastIndexOf('\n', start - 1) + 1
        let lineEnd = value.indexOf('\n', end)
        if (lineEnd === -1) lineEnd = value.length

        const linesContent = value.substring(lineStart, lineEnd)
        const lines = linesContent.split('\n')

        const newLines = lines.map((line) => {
            if (line.startsWith('> ')) return line.substring(2)
            if (line.startsWith('>')) return line.substring(1)
            if (line.startsWith('  ')) return line.substring(2)
            return line
        })

        const newText = newLines.join('\n')
        const res = replaceInfo(textarea, newText, lineStart, lineEnd)
        updateContent(res.value)

        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(lineStart, lineStart + newText.length)
        }, 0)
    }

    const handleEraser = () => {
        applyParams((sel) => {
            const stripped = sel.replace(/<[^>]*>|[*_~`]/g, '')
            return { text: stripped }
        })
    }

    return (
        <div className="flex w-full flex-col overflow-visible rounded-[20px] border border-[#E5E7EB]">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* 툴바 */}
            <div className="sticky top-0 z-20 flex flex-col items-center justify-center gap-4 border-b border-[#E5E7EB] bg-white px-8 py-4 shadow-sm">
                {/* 상단 */}
                <div className="flex w-full items-center justify-center gap-6">
                    {/* 되돌리기/다시실행 */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleUndo}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <UndoIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleRedo}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <RedoIcon />
                        </button>
                    </div>

                    <div className="h-6 w-px bg-[#E5E7EB]" />

                    {/* 글자 */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="flex h-8 cursor-not-allowed items-center gap-2 rounded bg-[#F3F4F6] px-3 text-sm text-[#4B5563] opacity-70"
                            disabled
                        >
                            기본서체
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        <div className="relative" ref={fontSizeRef}>
                            <button
                                type="button"
                                onClick={() => setIsFontSizeMenuOpen(!isFontSizeMenuOpen)}
                                className="flex h-8 items-center gap-2 rounded bg-[#F3F4F6] px-3 text-sm text-[#4B5563] hover:bg-gray-200"
                            >
                                {currentFontSize}
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {isFontSizeMenuOpen && (
                                <div className="absolute top-full left-0 z-30 mt-1 w-20 rounded border border-gray-200 bg-white py-1 shadow-lg">
                                    {['12', '14', '16', '18', '24', '32'].map((size) => (
                                        <button
                                            key={size}
                                            className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                                            onClick={() => handleFontSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#E5E7EB]" />

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={handleBold}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarBoldIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleItalic}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarItalicIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleUnderline}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarUnderlineIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleStrikethrough}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarStrikeIcon />
                        </button>

                        {/* 컬러 */}
                        <div
                            className="relative flex items-center gap-1"
                            ref={textColorRef}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setIsTextColorMenuOpen(!isTextColorMenuOpen)
                                }
                                className="rounded p-1 hover:bg-gray-100"
                            >
                                <ToolbarColorBoxIcon selectedColor={currentTextColor} />
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setIsTextColorMenuOpen(!isTextColorMenuOpen)
                                }
                                className="rounded p-1 hover:bg-gray-100"
                            >
                                <ToolbarArrowIcon />
                            </button>

                            <button
                                type="button"
                                onClick={handleUnderline}
                                className="rounded p-1 hover:bg-gray-100"
                            >
                                <ToolbarTextIcon />
                            </button>

                            {isTextColorMenuOpen && (
                                <div className="absolute top-full left-0 z-30 mt-1 grid w-32 grid-cols-4 gap-2 rounded border border-gray-200 bg-white p-2 shadow-lg">
                                    {[
                                        '#000000',
                                        '#FF0000',
                                        '#0000FF',
                                        '#008000',
                                        '#FFA500',
                                        '#800080',
                                        '#A52A2A',
                                        '#808080',
                                    ].map((c) => (
                                        <div
                                            key={c}
                                            className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 transition-transform hover:scale-110"
                                            style={{ backgroundColor: c }}
                                            onClick={() => handleTextColor(c)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-6 w-px bg-[#E5E7EB]" />

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleLink}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarLinkIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarImageIcon />
                        </button>
                    </div>
                </div>

                <div className="flex w-full items-center justify-center gap-6 border-t border-[#F3F4F6] pt-3">
                    {/* 리스트 (Bullet/Ordered) */}
                    <div className="relative" ref={listMenuRef}>
                        <button
                            type="button"
                            className="flex items-center rounded p-1 transition-colors hover:bg-gray-100"
                            onClick={() => setIsListMenuOpen(!isListMenuOpen)}
                        >
                            <ToolbarListGroupIcon />
                        </button>

                        {isListMenuOpen && (
                            <div className="absolute top-full left-0 z-50 mt-1 w-32 rounded-lg border border-[#E1E1E2] bg-white py-1 shadow-lg">
                                <button
                                    onClick={handleUnorderedList}
                                    className="flex w-full items-center px-4 py-2 text-sm text-[#52525B] hover:bg-gray-50"
                                >
                                    • 불렛 리스트
                                </button>
                                <button
                                    onClick={handleOrderedList}
                                    className="flex w-full items-center px-4 py-2 text-sm text-[#52525B] hover:bg-gray-50"
                                >
                                    1. 숫자 리스트
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleAlign('left')}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarAlignLeftIcon />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAlign('center')}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarAlignCenterIcon />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAlign('right')}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarAlignRightIcon />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAlign('justify')}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarAlignJustifyIcon />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleLineHeight}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarLineHeightIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleOutdent}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarOutdentIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleIndent}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarIndentIcon />
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={handleEraser}
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <ToolbarEraserIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-px bg-[#E5E7EB] p-px">
                <div className="flex h-full min-h-[600px] w-full flex-col bg-white p-6">
                    <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Markdown Editor
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => {
                            updateContent(e.target.value)
                        }}
                        className="flex-1 resize-none bg-transparent font-['Pretendard'] text-[14px] leading-relaxed text-black outline-none placeholder:text-gray-300"
                        placeholder={`# 제목

**굵은 글씨**와 *기울임 꼴*

> 인용문입니다.

1. 리스트 아이템 1
2. 리스트 아이템 2

이미지 버튼을 눌러 이미지를 추가해보세요.`}
                    />
                </div>

                <div className="flex h-full min-h-[600px] w-full flex-col bg-white p-6">
                    <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Preview
                    </div>
                    <div className="prose prose-sm max-w-none flex-1 overflow-y-auto font-['Pretendard'] text-[14px] leading-relaxed text-black">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1
                                        className="my-4 border-b pb-2 text-2xl font-bold"
                                        {...props}
                                    />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="my-3 text-xl font-bold" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="my-2 text-lg font-bold" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul
                                        className="my-2 list-inside list-disc pl-2"
                                        {...props}
                                    />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol
                                        className="my-2 list-inside list-decimal pl-2"
                                        {...props}
                                    />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote
                                        className="my-2 border-l-4 border-gray-300 bg-gray-50 py-1 pl-4 text-gray-600 italic"
                                        {...props}
                                    />
                                ),
                                a: ({ node, ...props }) => (
                                    <a
                                        className="text-blue-600 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...props}
                                    />
                                ),
                                img: ({ node, ...props }) => {
                                    if (!props.src || props.src.trim() === '') return null
                                    return (
                                        <img
                                            className="h-auto max-w-full rounded border border-gray-100 shadow-sm"
                                            {...props}
                                        />
                                    )
                                },
                                code: ({ node, ...props }) => (
                                    <code
                                        className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-red-500"
                                        {...props}
                                    />
                                ),
                                pre: ({ node, ...props }) => (
                                    <pre
                                        className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white"
                                        {...props}
                                    />
                                ),
                                span: ({ node, ...props }) => <span {...props} />,
                                div: ({ node, ...props }) => <div {...props} />,
                            }}
                        >
                            {value || '*미리보기가 여기에 표시됩니다.*'}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
