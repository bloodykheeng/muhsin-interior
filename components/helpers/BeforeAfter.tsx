"use client";

import React, { useReducer, useRef, useCallback } from 'react'

type State = {
    rangeValue: number
}

type Action =
    | { type: 'change'; payload: number }
    | { type: 'move'; payload: number }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'change':
            return { rangeValue: action.payload }
        case 'move':
            return { rangeValue: Math.min(100, Math.max(0, Math.round(action.payload))) }
        default:
            return state
    }
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type ReactPointerEvent = React.PointerEvent<HTMLDivElement>
type InlineStyle = React.CSSProperties

interface Props {
    beforeImage: string
    afterImage: string
    /**
     * "drag"        – default: only dragging the center button moves the slider
     * "click"       – clicking anywhere on the image jumps the slider to that position
     * "hover"       – hovering over the image moves the slider (original pointerMove behavior)
     */
    mode?: 'drag' | 'click' | 'hover'
    onChange?: (value: number) => void
    onPointerEnter?: (event: ReactPointerEvent) => void
    onPointerLeave?: (event: ReactPointerEvent) => void
    className?: string
    beforeClassName?: string
    afterClassName?: string
    buttonClassName?: string
    style?: InlineStyle
    beforeStyle?: InlineStyle
    afterStyle?: InlineStyle
    buttonStyle?: InlineStyle
}

export function BeforeAfter({
    beforeImage,
    afterImage,
    mode = 'drag',
    onChange,
    onPointerEnter,
    onPointerLeave,
    className = 'before-after-slider',
    beforeClassName = 'before',
    afterClassName = 'after',
    buttonClassName = 'resize-button',
    style,
    beforeStyle,
    afterStyle,
    buttonStyle
}: Props) {
    const [{ rangeValue }, dispatch] = useReducer(reducer, { rangeValue: 50 })
    const containerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)

    // Shared helper: compute % from a clientX within the container
    const clientXToPercent = useCallback((clientX: number): number => {
        if (!containerRef.current) return 50
        const { left, width } = containerRef.current.getBoundingClientRect()
        return ((clientX - left) / width) * 100
    }, [])

    // ── DRAG mode handlers (attached to the button) ──────────────────────────
    const handleButtonPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (mode !== 'drag') return
        e.preventDefault()
        e.stopPropagation()
        isDragging.current = true
            ; (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    }, [mode])

    const handleButtonPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (mode !== 'drag' || !isDragging.current) return
        e.preventDefault()
        const pct = clientXToPercent(e.clientX)
        dispatch({ type: 'move', payload: pct })
        onChange?.(Math.min(100, Math.max(0, Math.round(pct))))
    }, [mode, clientXToPercent, onChange])

    const handleButtonPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (mode !== 'drag') return
        isDragging.current = false
            ; (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId)
    }, [mode])

    // ── CLICK mode handler (attached to the container) ───────────────────────
    const handleContainerPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (mode !== 'click') return
        const pct = clientXToPercent(e.clientX)
        dispatch({ type: 'move', payload: pct })
        onChange?.(Math.min(100, Math.max(0, Math.round(pct))))

        // Also allow dragging after the initial click
        isDragging.current = true
            ; (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    }, [mode, clientXToPercent, onChange])

    const handleContainerPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (mode === 'hover') {
            const pct = clientXToPercent(e.clientX)
            dispatch({ type: 'move', payload: pct })
            onChange?.(Math.min(100, Math.max(0, Math.round(pct))))
            return
        }
        if (mode === 'click' && isDragging.current) {
            const pct = clientXToPercent(e.clientX)
            dispatch({ type: 'move', payload: pct })
            onChange?.(Math.min(100, Math.max(0, Math.round(pct))))
        }
    }, [mode, clientXToPercent, onChange])

    const handleContainerPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (mode === 'click') {
            isDragging.current = false
                ; (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId)
        }
    }, [mode])

    // ── Fallback range input (used alongside drag mode for accessibility) ─────
    const handleRangeChange = useCallback((e: ChangeEvent) => {
        const val = Number(e.target.value)
        dispatch({ type: 'change', payload: val })
        onChange?.(val)
    }, [onChange])

    const cursorStyle = mode === 'hover' ? 'col-resize' : 'default'

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                minHeight: 200,          // fallback so container never collapses
                cursor: cursorStyle,
                userSelect: 'none',
                touchAction: 'none',
                ...style                 // caller's height/minHeight wins
            }}
            onPointerDown={handleContainerPointerDown}
            onPointerMove={handleContainerPointerMove}
            onPointerUp={handleContainerPointerUp}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            {/* Before (left) image */}
            <div
                className={beforeClassName}
                style={{
                    position: 'absolute',
                    overflow: 'hidden',
                    width: `${rangeValue}%`,
                    height: '100%',
                    top: 0,
                    left: 0,
                    borderRight: '2px solid #fff',
                    zIndex: 1,
                    ...beforeStyle
                }}
            >
                <img
                    src={beforeImage}
                    alt="before"
                    draggable={false}
                    style={{ height: '100%', width: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                />
            </div>

            {/* After (right) image */}
            <div className={afterClassName} style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                ...afterStyle
            }}>
                <img
                    src={afterImage}
                    alt="after"
                    draggable={false}
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', pointerEvents: 'none' }}
                />
            </div>

            {/* Labels */}
            <span style={{
                position: 'absolute', top: 12, left: 12, zIndex: 4,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '3px 8px',
                backdropFilter: 'blur(4px)', fontFamily: 'Poppins, sans-serif',
                pointerEvents: 'none',
            }}>Before</span>
            <span style={{
                position: 'absolute', top: 12, right: 12, zIndex: 4,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#181B34', background: '#F5C518', padding: '3px 8px',
                fontFamily: 'Poppins, sans-serif', pointerEvents: 'none',
            }}>After</span>

            {/* Drag handle button */}
            <div
                className={buttonClassName}
                onPointerDown={handleButtonPointerDown}
                onPointerMove={handleButtonPointerMove}
                onPointerUp={handleButtonPointerUp}
                style={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: '50%',
                    left: `${rangeValue}%`,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 3,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                    cursor: mode === 'drag' ? 'grab' : 'pointer',
                    touchAction: 'none',
                    ...buttonStyle
                }}
            >
                <svg fill="#333" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M24,12l-5.7-5.7V11c-3.7,0-9,0-12.6,0V6.3L0,12l5.8,5.7V13c3.6,0,8.9,0,12.5,0v4.7L24,12z" />
                </svg>
            </div>

            {/* Hidden range input for keyboard/accessibility */}
            <input
                type="range"
                min={0}
                max={100}
                value={rangeValue}
                name="slider"
                onChange={handleRangeChange}
                aria-label="Image comparison slider"
                style={{
                    position: 'absolute',
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    cursor: 'inherit',
                    zIndex: 5,
                    pointerEvents: mode === 'drag' ? 'none' : 'none', // kept for keyboard only
                }}
                onKeyDown={(e) => {
                    // allow arrow key control for accessibility
                    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                        const val = Number((e.target as HTMLInputElement).value)
                        dispatch({ type: 'change', payload: val })
                        onChange?.(val)
                    }
                }}
            />
        </div>
    )
}