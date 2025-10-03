import tkinter as tk
from tkinter import messagebox, ttk, PhotoImage
import json
import os

FILE_NAME = "titles.json"

if os.path.exists(FILE_NAME) and os.path.getsize(FILE_NAME) > 0:
    with open(FILE_NAME, 'r', encoding='utf-8') as file:
        data = json.load(file)
else:
    data = []

selected_item = None
posortowana_kolejnosc = []  # globalna lista przechowująca posortowane dane do dropdown

def zapisz_nowy():
    global data
    tytuly = [entry.get() for entry in tytul_entries if entry.get().strip()]
    nazwa = nazwa_entry.get().strip()
    ile_w_dol = ile_w_dol_entry.get().strip()

    if not tytuly or not nazwa or not ile_w_dol.isdigit():
        messagebox.showerror("Błąd", "Uzupełnij poprawnie wszystkie pola.")
        return

    rekord = {
        "tytuly": tytuly,
        "nazwa_towaru": nazwa,
        "ile_w_dol": int(ile_w_dol)
    }

    data.append(rekord)
    zapisz_plik()
    messagebox.showinfo("Sukces", "Zapisano nową pozycję.")
    wyczysc_formularz()
    odswiez_dropdown()


def zapisz_plik():
    with open(FILE_NAME, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)


def wyczysc_formularz():
    for entry in tytul_entries:
        entry.delete(0, tk.END)
    nazwa_entry.delete(0, tk.END)
    ile_w_dol_entry.delete(0, tk.END)
    dropdown.set("")
    global selected_item
    selected_item = None


def zaladuj_rekord(event=None):
    global selected_item
    wybor = dropdown.current()
    if wybor == -1:
        return

    rekord = posortowana_kolejnosc[wybor]
    wyczysc_formularz()
    selected_item = data.index(rekord)  # indeks oryginalnego rekordu w data
    dropdown.current(wybor)

    for i, tytul in enumerate(rekord["tytuly"]):
        if i < len(tytul_entries):
            tytul_entries[i].insert(0, tytul)

    nazwa_entry.insert(0, rekord["nazwa_towaru"])
    ile_w_dol_entry.insert(0, str(rekord["ile_w_dol"]))


def zapisz_edycje():
    global selected_item

    if selected_item is None:
        messagebox.showerror("Błąd", "Nie wybrano rekordu do edycji.")
        return

    if not messagebox.askyesno("Potwierdzenie", "Czy na pewno chcesz zapisać zmiany dla wybranego rekordu?"):
        return

    tytuly = [entry.get() for entry in tytul_entries if entry.get().strip()]
    nazwa = nazwa_entry.get().strip()
    ile_w_dol = ile_w_dol_entry.get().strip()

    if not tytuly or not nazwa or not ile_w_dol.isdigit():
        messagebox.showerror("Błąd", "Uzupełnij poprawnie wszystkie pola.")
        return

    data[selected_item] = {
        "tytuly": tytuly,
        "nazwa_towaru": nazwa,
        "ile_w_dol": int(ile_w_dol)
    }

    zapisz_plik()
    messagebox.showinfo("Sukces", "Zaktualizowano wybrany rekord.")
    selected_item = None
    wyczysc_formularz()
    odswiez_dropdown()


def usun_pozycje():
    global data, selected_item

    if selected_item is None:
        messagebox.showerror("Błąd", "Nie wybrano rekordu do usunięcia.")
        return

    if not messagebox.askyesno("Potwierdzenie", "Czy na pewno chcesz usunąć ten rekord? Tej operacji nie można cofnąć."):
        return

    del data[selected_item]
    selected_item = None
    wyczysc_formularz()
    zapisz_plik()
    odswiez_dropdown()
    messagebox.showinfo("Sukces", "Wybrany rekord pomyślnie usunięty.")


def odswiez_dropdown():
    def tytuly_do_str(tytuly):
        if not tytuly:
            return ""
        pierwszy = tytuly[0]
        pozostale = ", ".join(tytuly[1:4])
        if len(tytuly) > 4:
            pozostale += ", ..."
        return f"{pierwszy} ({pozostale})" if pozostale else pierwszy

    global posortowana_kolejnosc
    posortowana_kolejnosc = sorted(data, key=lambda item: item["tytuly"][0].lower() if item["tytuly"] else "")

    dropdown["values"] = [tytuly_do_str(item["tytuly"]) for item in posortowana_kolejnosc]
    dropdown.set("")


# GUI
root = tk.Tk()
root.title("Edytor Tytułów")
root.resizable(False, False)
root.configure(bg="#f2f2f2")
ikona = os.path.join(os.path.dirname(__file__), "icon.png")
root.iconphoto(False, PhotoImage(file=ikona))

frame = tk.Frame(root, padx=20, pady=20, bg="#f2f2f2")
frame.pack()

font_label = ("Segoe UI", 10)
font_entry = ("Segoe UI", 10)

# Dropdown
tk.Label(frame, text="Wybierz istniejący rekord do edycji:", font=font_label, bg="#f2f2f2").grid(row=0, column=0, columnspan=4, sticky="w")
dropdown = ttk.Combobox(frame, width=55, state="readonly", font=font_entry)
dropdown.grid(row=1, column=0, columnspan=4, pady=5)
dropdown.bind("<<ComboboxSelected>>", zaladuj_rekord)

# Tytuły
tk.Label(frame, text="Wszystkie możliwe tytuły aukcji z Allegro/WordPress:", font=font_label, bg="#f2f2f2").grid(row=2, column=0, columnspan=4, sticky="w", pady=(10, 0))
tytul_entries = []
for i in range(10):
    entry = tk.Entry(frame, width=55, font=font_entry)
    entry.grid(row=i + 3, column=0, columnspan=4, pady=2)
    tytul_entries.append(entry)

# Nazwa i ilość
row_offset = 13
tk.Label(frame, text="Nazwa towaru w MikroSubiekt:", font=font_label, bg="#f2f2f2").grid(row=row_offset, column=0, columnspan=4, sticky="w", pady=(10, 0))
nazwa_entry = tk.Entry(frame, width=55, font=font_entry)
nazwa_entry.grid(row=row_offset + 1, column=0, columnspan=4, pady=2)

tk.Label(frame, text="Ile pozycji w dół po wpisaniu towaru w MikroSubiekt?", font=font_label, bg="#f2f2f2").grid(row=row_offset + 2, column=0, columnspan=4, sticky="w", pady=(10, 0))
ile_w_dol_entry = tk.Entry(frame, width=55, font=font_entry)
ile_w_dol_entry.grid(row=row_offset + 3, column=0, columnspan=4, pady=2)

# Przyciski
button_style = {"padx": 10, "pady": (20, 0)}
tk.Button(frame, text="Zapisz jako nowy", font=font_label, command=zapisz_nowy).grid(row=row_offset + 5, column=0, **button_style)
tk.Button(frame, text="Zapisz edycję", font=font_label, command=zapisz_edycje).grid(row=row_offset + 5, column=1, **button_style)
tk.Button(frame, text="Wyczyść pola", font=font_label, command=wyczysc_formularz).grid(row=row_offset + 5, column=2, **button_style)
tk.Button(frame, text="Usuń rekord", font=font_label, command=usun_pozycje).grid(row=row_offset + 5, column=3, **button_style)

odswiez_dropdown()
root.mainloop()
