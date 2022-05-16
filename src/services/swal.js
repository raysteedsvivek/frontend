import Swal from 'sweetalert2';

export function successAlert(title, text) {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        showConfirmButton: true,
    });
}

export function errorAlert(title, text) {
    return Swal.fire({
        icon: 'error',
        title,
        text,
        showConfirmButton: true
    });
}