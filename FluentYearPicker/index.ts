import { IInputs, IOutputs } from "./generated/ManifestTypes";
import FluentYearPickerComponent, { IFluentYearPickerProps } from "./FluentYearPicker"; 
import * as React from "react";

export class PCFFluentYearPicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private _value: string;
    private _isDarkMode: boolean;
    private _formFactor: number;
    private _isDisabled: boolean;

    constructor() { 
        this._value = "";
        this._isDarkMode = false;
        this._formFactor = 0;
        this._isDisabled = false;
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._updateContextValues(context);

        const yearInput = context.parameters.yearInput;
        this._value = yearInput.raw || "";
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._updateContextValues(context);

        const props: IFluentYearPickerProps = { 
            year: this._value,
            updatedValue: this._updateValue.bind(this),
            isDarkMode: this._isDarkMode,
            formFactor: this._formFactor,
            disabled: this._isDisabled
        };

        return React.createElement(FluentYearPickerComponent, props);
    }

    private _updateContextValues(context: ComponentFramework.Context<IInputs>): void {
        this._isDarkMode = context.fluentDesignLanguage?.isDarkTheme ?? false;
        this._formFactor = context.client.getFormFactor();
        this._isDisabled = context.mode.isControlDisabled;
    }
    
    private _updateValue(value: string) {
        this._value = value;
        this.notifyOutputChanged();
    }

    public getOutputs(): IOutputs {
        return { 
            yearInput: this._value
        };
    }

    public destroy(): void {
        // Cleanup if necessary
    }
}
