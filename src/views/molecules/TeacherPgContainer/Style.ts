import styled               from 'styled-components';
import { ScreenSize }       from 'constants/screenSize';
import background_mobile    from 'views/assets/colored-shapes-bg.svg';
import teacher_title_bar_img          from 'views/assets/teacherTitleBar.svg'
export const Container = styled.div`
    position    : relative;
    width       : 100%;
    min-height  : 100vh;
    overflow    : hidden;
    display     : flex;
    flex-direction: column;
    @media screen and (max-width: ${ScreenSize.tablet}) {
        background: url(${background_mobile}), #FFFFFF;
        background-position-x: right;
    }
`;

export const LogoTitle = styled.img`
    position: absolute;
    left: 300px;
    top: 90px
`;

export const Center = styled.div`
    display           : flex;
    flex-direction    : column;
    align-items       : center;
    width             : 70vw;
    align-self        : center;
`;

export const BgRight = styled.img`
    position    : absolute;
    right       : 0;
    bottom      : 0;
    z-index     : -1;
`;

export const BgLeft = styled.img`
    position    : absolute;
    left        : 0;
    z-index     : -1;
    top         : 0;
`;

export const TeacherTitleBar = styled.div`
    display     : flex;
    width       : 385px;
    height      : 81px;
    margin-left : 266px;
    margin-top  : 54px;
    font-size   : 40px;
    color       : white;
    background  : url(${teacher_title_bar_img}), #FFFFFF;
    align-items     : center;
    justify-content : center;
`;
