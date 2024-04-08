function Logo() {
  return (
    <svg
      viewBox='0 0 80 80'
      className='w-[72px] h-[72px] md:w-20 md:h-20 lg:w-24 lg:h-24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Group 9'>
        <g id='Rectangle Copy 3'>
          <path
            id='Mask'
            d='M0 0H60C71.0457 0 80 8.95431 80 20V60C80 71.0457 71.0457 80 60 80H0V0Z'
            fill='#7C5DFA'
          />
          <mask
            id='mask0_1_307'
            style={{ maskType: 'luminance' }}
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='80'
            height='80'
          >
            <path
              id='Mask_2'
              d='M0 0H60C71.0457 0 80 8.95431 80 20V60C80 71.0457 71.0457 80 60 80H0V0Z'
              fill='white'
            />
          </mask>
          <g mask='url(#mask0_1_307)'>
            <path
              id='Rectangle Copy 3_2'
              d='M80 40.3887H20C8.95431 40.3887 0 49.343 0 60.3887V100.389C0 111.434 8.95431 120.389 20 120.389H80V40.3887Z'
              fill='#9277FF'
            />
          </g>
        </g>
        <path
          id='Combined Shape'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M33.288 26L40.5 40.3876L47.712 26C52.64 28.5753 56 33.7075 56 39.6185C56 48.1134 49.0604 54.9999 40.5 54.9999C31.9396 54.9999 25 48.1134 25 39.6185C25 33.7075 28.36 28.5753 33.288 26Z'
          fill='white'
        />
      </g>
    </svg>
  );
}

export default Logo;
