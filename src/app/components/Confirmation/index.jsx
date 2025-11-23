import React from 'react';
import styles from './Confirmation.module.css';

export default function ConfirmationDialog({ message, onConfirm, onCancel, messageConfirm }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <p className={styles.message}>
                    {message}
                </p>
                <div className={styles.actions}>
                    <button 
                        onClick={onCancel}
                        className={styles.cancelButton}
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm}
                        className={styles.confirmButton}
                    >
                        {messageConfirm || 'Sim, Excluir'}
                    </button>
                </div>
            </div>
        </div>
    );
}