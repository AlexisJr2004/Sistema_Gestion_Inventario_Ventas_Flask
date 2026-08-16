// Reloj compartido del footer
function updateTime() {
    const timeElement = document.getElementById('time');
    const ampmElement = document.getElementById('ampm');
    if (!timeElement || !ampmElement) return;

    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    timeElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    ampmElement.innerHTML = ampm;
}
setInterval(updateTime, 1000);
updateTime();

// Sidebar (menú lateral) en móvil: drawer deslizable + backdrop
function toggleSidebar(forceClose) {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar || !backdrop) return;

    const isOpen = sidebar.classList.contains('translate-x-0');
    const shouldOpen = forceClose === true ? false : !isOpen;

    sidebar.classList.toggle('translate-x-0', shouldOpen);
    sidebar.classList.toggle('-translate-x-full', !shouldOpen);
    backdrop.classList.toggle('hidden', !shouldOpen);
    backdrop.classList.toggle('opacity-100', shouldOpen);
    document.body.classList.toggle('overflow-hidden', shouldOpen);
}

// Previsualización de imágenes al seleccionarlas en un <input type="file">
function previsualizarImagen(input, imgId, placeholderId) {
    const preview = document.getElementById(imgId);
    const placeholder = placeholderId ? document.getElementById(placeholderId) : null;
    if (!preview) return;

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.classList.add('hidden');
        preview.removeAttribute('src');
        if (placeholder) placeholder.classList.remove('hidden');
    }
}

// Spinner de carga breve al entrar a cada página
document.addEventListener('DOMContentLoaded', function () {
    if (window.Swal) {
        Swal.fire({
            title: 'Cargando...',
            html: 'Por favor, espere...',
            icon: 'info',
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        setTimeout(() => {
            Swal.close();
        }, 700);
    }
});
