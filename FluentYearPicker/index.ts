import { IInputs, IOutputs } from "./generated/ManifestTypes";
import FluentYearPicker, { FluentYearPickerProps } from "./FluentYearPicker"; 
import * as React from "react";

export class PCFFluentYearPicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged!: () => void;
    private _value!: string;
    private _isDarkMode!: boolean;
    private _formFactor!: number;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._value = context.parameters.yearInput.raw || "";
        this._updateContextValues(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        // Update values in case they change dynamically
        this._updateContextValues(context);

        const props: FluentYearPickerProps = { 
            year: context.parameters.yearInput.raw || this._value,
            updatedValue: this._updateValue.bind(this),
            isDarkMode: this._isDarkMode,
            formFactor: this._formFactor
        };
        return React.createElement(
            FluentYearPicker, props
        );
    }

    private _updateContextValues(context: ComponentFramework.Context<IInputs>): void {
        this._isDarkMode = context.fluentDesignLanguage?.isDarkTheme ?? false; // Handle theme dynamically
        this._formFactor = context.client.getFormFactor(); // Handle form factor dynamically
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
        // Add code to cleanup control if necessary
    }
}
