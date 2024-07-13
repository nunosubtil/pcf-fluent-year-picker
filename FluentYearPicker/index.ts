import { IInputs, IOutputs } from "./generated/ManifestTypes";
import FluentYearPicker, { FluentYearPickerProps } from "./FluentYearPicker"; 
import * as React from "react";

export class PCFFluentYearPicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent!: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged!: () => void;
    private _value!: string;
    private _isDarkMode!: boolean;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._isDarkMode = context.fluentDesignLanguage?.isDarkTheme ?? false;
        this._value = context.parameters.yearInput.raw || ""; // Initialize _value
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: FluentYearPickerProps = { 
            year: context.parameters.yearInput.raw || this._value,
            updatedValue: this._updateValue.bind(this),
            isDarkMode: this._isDarkMode
        };
        return React.createElement(
            FluentYearPicker, props
        );
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