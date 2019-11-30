import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        uploadModalIsShowing: isShowing,
        uploadModalToggle: toggle,
    }
};

export default useModal;