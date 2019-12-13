import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { R_IPV4, R_MAC, R_HOST, R_IPV6, R_CIDR, UNSAFE_PORTS } from '../helpers/constants';

export const renderTextarea = (props) => {
    const {
        input, id, placeholder, type, className, disabled, autoComplete,
    } = props;
    return (<textarea
        {...input}
        id={id}
        placeholder={placeholder}
        type={type}
        className={className}
        disabled={disabled}
        autoComplete={autoComplete}
    />);
};

export const renderInput = (props) => {
    const {
        input, id, placeholder, type, className, disabled, autoComplete,
    } = props;
    return (<input
        {...input}
        id={id}
        placeholder={placeholder}
        type={type}
        className={className}
        disabled={disabled}
        autoComplete={autoComplete}
    />);
};

export const renderField = ({
    input, id, className, placeholder, type, disabled,
    autoComplete, textarea, meta: { touched, error },
}) => {
    const props = {
        input, id, placeholder, type, className, disabled, autoComplete,
    };

    const component = textarea ? renderTextarea(props) : renderInput(props);

    return (
        <Fragment>
            {component}
            {!disabled &&
            touched &&
            (error && <span className="form__message form__message--error">{error}</span>)}
        </Fragment>
    );
};

renderField.propTypes = {
    input: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    autoComplete: PropTypes.bool,
    textarea: PropTypes.bool,
    meta: PropTypes.object.isRequired,
};

export const renderGroupField = ({
    input,
    id,
    className,
    placeholder,
    type,
    disabled,
    autoComplete,
    isActionAvailable,
    removeField,
    meta: { touched, error },
}) => (
    <Fragment>
        <div className="input-group">
            <input
                {...input}
                id={id}
                placeholder={placeholder}
                type={type}
                className={className}
                disabled={disabled}
                autoComplete={autoComplete}
            />
            {isActionAvailable &&
            <span className="input-group-append">
                    <button
                        type="button"
                        className="btn btn-secondary btn-icon"
                        onClick={removeField}
                    >
                        <svg className="icon icon--close">
                            <use xlinkHref="#cross" />
                        </svg>
                    </button>
                </span>
            }
        </div>
        {!disabled &&
        touched &&
        (error && <span className="form__message form__message--error">{error}</span>)}
    </Fragment>
);

export const renderRadioField = ({
    input, placeholder, disabled, meta: { touched, error },
}) => (
    <Fragment>
        <label className="custom-control custom-radio custom-control-inline">
            <input {...input} type="radio" className="custom-control-input" disabled={disabled} />
            <span className="custom-control-label">{placeholder}</span>
        </label>
        {!disabled &&
        touched &&
        (error && <span className="form__message form__message--error">{error}</span>)}
    </Fragment>
);

export const renderSelectField = ({
    input,
    placeholder,
    subtitle,
    disabled,
    modifier = 'checkbox--form',
    meta: { touched, error },
}) => (
    <Fragment>
        <label className={`checkbox ${modifier}`}>
            <span className="checkbox__marker" />
            <input {...input} type="checkbox" className="checkbox__input" disabled={disabled} />
            <span className="checkbox__label">
                <span className="checkbox__label-text checkbox__label-text--long">
                    <span className="checkbox__label-title">{placeholder}</span>
                    {subtitle && (
                        <span
                            className="checkbox__label-subtitle"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}
                </span>
            </span>
        </label>
        {!disabled &&
        touched &&
        (error && <span className="form__message form__message--error">{error}</span>)}
    </Fragment>
);

export const renderServiceField = ({
    input,
    placeholder,
    disabled,
    modifier,
    icon,
    meta: { touched, error },
}) => (
    <Fragment>
        <label className={`service custom-switch ${modifier}`}>
            <input
                {...input}
                type="checkbox"
                className="custom-switch-input"
                value={placeholder.toLowerCase()}
                disabled={disabled}
            />
            <span className="service__switch custom-switch-indicator"></span>
            <span className="service__text">{placeholder}</span>
            <svg className="service__icon">
                <use xlinkHref={`#${icon}`} />
            </svg>
        </label>
        {!disabled &&
        touched &&
        (error && <span className="form__message form__message--error">{error}</span>)}
    </Fragment>
);

// Validation functions
export const required = (value) => {
    const formattedValue = typeof value === 'string' ? value.trim() : value;
    if (formattedValue || formattedValue === 0 || (formattedValue && formattedValue.length !== 0)) {
        return undefined;
    }
    return <Trans>form_error_required</Trans>;
};

export const ipv4 = (value) => {
    if (value && !new RegExp(R_IPV4).test(value)) {
        return <Trans>form_error_ip4_format</Trans>;
    }
    return false;
};

export const clientId = (value) => {
    if (!value) {
        return undefined;
    }
    const formattedValue = value ? value.trim() : value;
    if (formattedValue && !(R_IPV4.test(formattedValue) || R_IPV6.test(formattedValue)
        || R_MAC.test(formattedValue) || R_CIDR.test(formattedValue))) {
        return <Trans>form_error_client_id_format</Trans>;
    }
    return undefined;
};

export const multilineClientId = (values) => {
    if (values && !values.trim().split('\n').every((value) => {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            return true;
        }
        return (R_IPV4.test(trimmedValue) || R_IPV6.test(trimmedValue)
            || R_MAC.test(trimmedValue) || R_CIDR.test(trimmedValue));
    })) {
        return <Trans>form_error_ip_format</Trans>;
    }
    return undefined;
};

export const ipv6 = (value) => {
    if (value && !new RegExp(R_IPV6).test(value)) {
        return <Trans>form_error_ip6_format</Trans>;
    }
    return false;
};

export const ip = (value) => {
    if (value && !new RegExp(R_IPV4).test(value) && !new RegExp(R_IPV6).test(value)) {
        return <Trans>form_error_ip_format</Trans>;
    }
    return false;
};

export const mac = (value) => {
    if (value && !new RegExp(R_MAC).test(value)) {
        return <Trans>form_error_mac_format</Trans>;
    }
    return false;
};

export const isPositive = (value) => {
    if ((value || value === 0) && value <= 0) {
        return <Trans>form_error_positive</Trans>;
    }
    return false;
};

export const port = (value) => {
    if ((value || value === 0) && (value < 80 || value > 65535)) {
        return <Trans>form_error_port_range</Trans>;
    }
    return false;
};

export const portTLS = (value) => {
    if (value === 0) {
        return false;
    } else if (value && (value < 80 || value > 65535)) {
        return <Trans>form_error_port_range</Trans>;
    }
    return false;
};

export const isSafePort = (value) => {
    if (UNSAFE_PORTS.includes(value)) {
        return <Trans>form_error_port_unsafe</Trans>;
    }
    return false;
};

export const domain = (value) => {
    if (value && !new RegExp(R_HOST).test(value)) {
        return <Trans>form_error_domain_format</Trans>;
    }
    return false;
};

export const multilineDomain = (values) => {
    if (values && !values.trim().split('\n').every(value => (value ? R_HOST.test(value.trim()) : true))) {
        return <Trans>form_error_domain_format</Trans>;
    }
    return undefined;
};

export const answer = (value) => {
    if (
        value &&
        (!new RegExp(R_IPV4).test(value) &&
            !new RegExp(R_IPV6).test(value) &&
            !new RegExp(R_HOST).test(value))
    ) {
        return <Trans>form_error_answer_format</Trans>;
    }
    return false;
};

export const toNumber = value => value && parseInt(value, 10);
