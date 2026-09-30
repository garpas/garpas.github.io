import { forwardRef } from 'react'

// 문자열을 글자 단위 span 으로 쪼갠다.
// .k-letter       : 커서 반응(useKineticLetters)이 움직이는 바깥 레이어
// .k-letter-inner : 분해/재조립 애니메이션이 움직이는 안쪽 레이어
export const KineticText = forwardRef(function KineticText(
  { text, as: Tag = 'span', className = '', ...rest },
  ref,
) {
  return (
    <Tag ref={ref} className={`k-text ${className}`} aria-label={text} {...rest}>
      {Array.from(text).map((ch, i) => (
        <span className="k-letter" key={i} aria-hidden="true">
          <span className="k-letter-inner">{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </Tag>
  )
})
