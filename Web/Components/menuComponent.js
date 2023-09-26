export default function generateMenu() {
    const menuContent = `<div class="wilsterman-logo">
        <a href="./main.html" class="menu-logo">
            <img src="./Images/Teams/Wilsterman.png" alt="Logo_Wilsterman" width="96px" height="60px">
        </a>
    </div>

    <div class="label-team">
        <p>Club Jorge Wilsterman</p>
    </div>

    <div class="menu-space">
    </div>

    <div class="menu-options">
        <ul>
            <li><a href="./players.html" target=>PLANTEL</a></li>
            <li><a href="./rumors.html" target=>RUMORES</a></li>
            <li><a href="#footer" target=>CLUB</a></li>
        </ul>
    </div>

    <div class="sponsor-menu">
        <a href="https://www.facebook.com/forteathletic/" class="sponsor-logo">
            <img src="./Images/Sponsors/Mods/forte-azul.gif" alt="Logo_Forte" width="60px" height="48px">
        </a>
    </div>

    <div class="sponsor-menu">
        <a href="https://www.suzuki.com.bo/" class="sponsor-logo">
            <img src="./Images/Sponsors/Mods/Suzuki-azul.gif" alt="Logo_Suzuki" width="60px" height="48px">
        </a>
    </div>`;
    return menuContent;
}
