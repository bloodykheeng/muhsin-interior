"use client";

import React, { useReducer } from 'react'

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
            return { rangeValue: Math.round(action.payload) }
        default:
            return state
    }
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type PointerEvent = React.PointerEvent<HTMLDivElement>
type InlineStyle = React.CSSProperties

interface Props {
    beforeImage: string
    afterImage: string
    onChange?: (event: ChangeEvent) => void
    onPointerMove?: (event: PointerEvent) => void
    onPointerEnter?: (event: PointerEvent) => void
    onPointerLeave?: (event: PointerEvent) => void
    pointerMove?: boolean
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
    onChange,
    onPointerMove,
    onPointerEnter,
    onPointerLeave,
    pointerMove = false,
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

    const handleChange = (event: ChangeEvent) => {
        dispatch({ type: 'change', payload: Number(event.target.value) })
        if (onChange) onChange(event)
    }

    const handlePointerMove = (event: PointerEvent) => {
        const { clientX, currentTarget } = event
        const { left, width } = currentTarget.getBoundingClientRect()
        const positionX = clientX - left
        if (positionX >= 0)
            dispatch({ type: 'move', payload: (positionX / width) * 100 })
        if (onPointerMove) onPointerMove(event)
    }

    const handlePointerEnter = (event: PointerEvent) => {
        if (onPointerEnter) onPointerEnter(event)
    }

    const handlePointerLeave = (event: PointerEvent) => {
        if (onPointerLeave) onPointerLeave(event)
    }

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                cursor: 'e-resize',
                userSelect: 'none',
                ...style
            }}
            onPointerMove={pointerMove ? handlePointerMove : undefined}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
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
                <img src={beforeImage} alt="before" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>

            <div className={afterClassName} style={{ width: '100%', ...afterStyle }}>
                <img src={afterImage} alt="after" style={{ maxWidth: '100%', width: '100%', display: 'block', objectFit: 'cover' }} />
            </div>

            {/* Before / After labels */}
            <span style={{
                position: 'absolute', top: 12, left: 12, zIndex: 2,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '3px 8px',
                backdropFilter: 'blur(4px)', fontFamily: 'Poppins, sans-serif',
                pointerEvents: 'none',
            }}>Before</span>
            <span style={{
                position: 'absolute', top: 12, right: 12, zIndex: 2,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#181B34', background: '#F5C518', padding: '3px 8px',
                fontFamily: 'Poppins, sans-serif', pointerEvents: 'none',
            }}>After</span>

            {!pointerMove && (
                <>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={rangeValue}
                        name="slider"
                        onChange={handleChange}
                        style={{
                            appearance: 'none',
                            backgroundColor: 'transparent',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            cursor: 'inherit',
                            zIndex: 3,
                        }}
                    />
                    <div
                        className={buttonClassName}
                        style={{
                            backgroundColor: '#fff',
                            pointerEvents: 'none',
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
                            zIndex: 2,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                            ...buttonStyle
                        }}
                    >
                        <svg fill="#333" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path d="M24,12l-5.7-5.7V11c-3.7,0-9,0-12.6,0V6.3L0,12l5.8,5.7V13c3.6,0,8.9,0,12.5,0v4.7L24,12z" />
                        </svg>
                    </div>
                </>
            )}
        </div>
    )
}