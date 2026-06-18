import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-animated-input',
  standalone: true,
  imports: [NgFor],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AnimatedInputComponent),
    multi: true,
  }],
  templateUrl: './animated-input.component.html',
  styleUrl: './animated-input.component.scss',
})
export class AnimatedInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() inputId = '';
  @Input() autocomplete = 'off';
  @Input() isInvalid = false;

  value = '';
  isFocused = false;
  isDisabled = false;

  get labelChars(): string[] { return Array.from(this.label); }
  get isActive(): boolean { return this.isFocused || this.value.length > 0; }

  private onChange = (_: string) => {};
  private onTouched = () => {};

  writeValue(val: string): void { this.value = val ?? ''; }
  registerOnChange(fn: (_: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.isDisabled = d; }

  onInput(e: Event): void {
    this.value = (e.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  onFocus(): void { this.isFocused = true; }
  onBlur(): void { this.isFocused = false; this.onTouched(); }
}
