import React from 'react';

const Rank = ({name, entries}) => {return(
        <div className="rank">
        	<div className='f3 white'>
        		{`${name} Your current entries are...`}
        	</div>
        	<div className='f1 white'>
        		{entries}
        	</div>
        </div>
		);
}

export default Rank;