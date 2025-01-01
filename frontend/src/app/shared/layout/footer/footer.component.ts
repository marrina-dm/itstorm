import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Popup} from "../../../../types/popup.enum";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @ViewChild('popup') popup!: TemplateRef<ElementRef>;

  protected readonly popupType = Popup;

  private dialogRef: MatDialogRef<any> | null = null;

  constructor(private dialog: MatDialog) {
  }

  protected openPopup(): void {
    this.dialogRef = this.dialog.open(this.popup);
  }

  protected closePopup(): void {
    this.dialogRef?.close();
  }
}
