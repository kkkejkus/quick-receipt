import tkinter as tk
from tkinter import ttk, PhotoImage
from datetime import datetime
import os
import threading
import time
import re
import subprocess
import sys
import json
import pygame
import pyautogui
import keyboard
import unicodedata

pygame.mixer.init(100000)
pygame.mixer.music.set_volume(0.2)
paragon_path = 'C:/Users/kamil/Downloads/paragon.txt'
faktura_path = 'C:/Users/kamil/Downloads/faktura.txt'
ostatnia_data_paragonu = None
ostatnie_zrodlo = ""
status = {
    "czeka": False,
    "przetwarza": False,
    "pozycje": [],
    "faktura_wykryta": False,
    "faktura_dane": []
}

def wdol(ile):
    for i in range(ile):
        pyautogui.press('down')
        time.sleep(0.05)

def mcws(x, y, przerwa, wartosc):
    pyautogui.moveTo(x, y)
    time.sleep(0.05)
    pyautogui.click()
    keyboard.write(wartosc)
    time.sleep(przerwa)

def usun_znaki_pl(text):
    return ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    ).lower()

def skroc_tekst(tekst, max_dl):
    return tekst if len(tekst) <= max_dl else tekst[:max_dl - 3] + "..."

def znajdz_wojewodztwo(kod_pocztowy):
    wojewodztwa = {
        "dolnośląskie": [(50000, 59999)],
        "kujawsko-pomorskie": [(85000, 89999)],
        "lubelskie": [(20000, 23999)],
        "lubuskie": [(65000, 69999)],
        "łódzkie": [(90000, 99999)],
        "małopolskie": [(30000, 34999)],
        "mazowieckie": [(0, 9999)],
        "opolskie": [(45000, 49999)],
        "podkarpackie": [(35000, 39999)],
        "podlaskie": [(15000, 19999)],
        "pomorskie": [(80000, 84999)],
        "śląskie": [(40000, 44999)],
        "świętokrzyskie": [(25000, 29999)],
        "warmińsko-mazurskie": [(10000, 14999)],
        "wielkopolskie": [(60000, 64999)],
        "zachodniopomorskie": [(70000, 78999)],
    }
    try:
        kod_bez_kreski = int(kod_pocztowy.replace('-', ''))
    except ValueError:
        return "Nieprawidłowy format kodu pocztowego"
    for wojewodztwo, zakresy in wojewodztwa.items():
        for zakres in zakresy:
            if zakres[0] <= kod_bez_kreski <= zakres[1]:
                return wojewodztwo.capitalize()

def odczytaj_paragon():
    data = []
    try:
        with open(paragon_path, 'r', encoding='utf-8') as file:
            content = file.read().strip().split('\n')
            items = []
            shipping_cost = None
            current_item = []
            for line in content:
                if line.startswith('\t'):  # Sprawdzamy linie, które zawierają dane o przedmiocie
                    if 'Ilość' in line:  # Ilość
                        quantity = line.replace('Ilość: ', '').strip()
                        current_item.append(quantity)  # Dodaj ilość do bieżącego przedmiotu
                    elif 'Cena' in line:  # Cena
                        price = line.replace('Cena: ', '').strip()
                        current_item.append(price)  # Dodaj cenę do bieżącego przedmiotu
                        if len(current_item) == 3:  # Sprawdzamy, czy mamy pełny produkt
                            items.append(current_item)  # Zakończ przedmiot i dodaj do listy
                        current_item = []  # Zresetuj dane dla następnego przedmiotu
                    elif 'Koszt wysyłki:' in line:  # Koszt wysyłki
                        shipping_cost = line.replace('Koszt wysyłki: ', '').strip()
                    else:
                        # To jest tytuł przedmiotu
                        title = line.strip()
                        title = title[3:]
                        current_item = [title]  # Zaczynamy nowy przedmiot
            # Dodaj dane o wysyłce, jeśli są i koszt wysyłki nie wynosi 0,00
            if shipping_cost and shipping_cost != '0,00':
                items.append(['Wysyłka', '1', shipping_cost])
            data = items
    except:
        pass
    return data

def odczytaj_fakture():
    try:
        with open(faktura_path, 'r', encoding='utf-8') as f:
            faktura = [line.strip() for line in f.readlines()]
        firma = faktura[0] if len(faktura) > 0 else "-"
        ulica = ""
        if len(faktura) > 2:
            ulica = f"{faktura[1]} {faktura[2]}"
        if len(faktura) > 3 and faktura[3] != "":
            ulica += f"/{faktura[3]}"
        kod = faktura[4] if len(faktura) > 4 else "-"
        miasto = faktura[5] if len(faktura) > 5 else "-"
        adres = kod + ' ' + miasto + ', ul. ' + ulica
        telefon = faktura[6] if len(faktura) > 6 else "-"
        nip = faktura[7] if len(faktura) > 7 and faktura[7] != "" else "-"
        status["faktura_dane"] = [
            skroc_tekst(firma, 28),
            skroc_tekst(adres, 37),
            telefon,
            nip
        ]
        status["faktura_wykryta"] = True
        os.remove(faktura_path)
        return faktura
    except:
        pass

def wprowadz_paragon():
    global ostatnia_data_paragonu
    ostatnia_data_paragonu = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    status["czeka"] = False
    status["przetwarza"] = True
    status["faktura_wykryta"] = False
    root.after(0, lambda: tabela_faktura.delete(*tabela_faktura.get_children()))
    status["pozycje"] = gui_wprowadz_paragon()
    time.sleep(3)
    if os.path.exists(faktura_path):
        y_position = 177
        pyautogui.moveTo(60, 150)
    else:
        y_position = 167
        pyautogui.moveTo(60, 200)
    pyautogui.click()
    time.sleep(0.2)
    pyautogui.moveTo(180, 80)
    pyautogui.click()
    time.sleep(0.5)
    data = odczytaj_paragon()
    for item in data:
        title, quantity, price = item
        pyautogui.moveTo(150, y_position)
        pyautogui.click()
        time.sleep(0.25)
        # Szukaj odpowiedniego skrótu i ile_w_dol w titles.json
        with open('titles.json', 'r', encoding='utf-8') as f:
            titles_data = json.load(f)
        found = False
        skrót = ''
        for entry in titles_data:
            for t in entry['tytuly']:
                # Dopasowanie ignorując wielkość liter, i jeśli t jest substringiem title
                if t.lower() in usun_znaki_pl(title).lower():
                    skrót = entry['nazwa_towaru']
                    ile_w_dol = entry['ile_w_dol']
                    found = True
                    break
            if found:
                break
        if skrót != '':
            pyautogui.write(skrót)
            time.sleep(1.25)
            if ile_w_dol != '0':
                wdol(ile_w_dol)
            pyautogui.press('enter')
        else:
            pygame.mixer.music.load('error.mp3')
            pygame.mixer.music.play()
            time.sleep(0.5)
            break
        pyautogui.moveTo(505, y_position)
        pyautogui.click()
        time.sleep(0.1)
        pyautogui.write(price)
        time.sleep(0.1)
        pyautogui.moveTo(270, y_position)
        pyautogui.click()
        time.sleep(0.1)
        pyautogui.write(quantity)
        time.sleep(0.2)
        y_position += 18
    pyautogui.press('down')
    pyautogui.press('down')
    if os.path.exists(faktura_path):
        pyautogui.moveTo(555, 128)
        pyautogui.click()
        faktura = odczytaj_fakture()
        time.sleep(0.3)
        mcws(260, 240, 0.3, faktura[0])
        mcws(260, 270, 0.3, faktura[0])
        mcws(230, 325, 0.3, faktura[1])
        mcws(420, 325, 0.3, faktura[2])
        if faktura[3].strip() != '':
            mcws(530, 325, 0.3, faktura[3])
        mcws(220, 355, 0.3, faktura[4])
        mcws(220, 380, 0.3, znajdz_wojewodztwo(faktura[4]))
        pyautogui.press('enter')
        pyautogui.moveTo(440, 355)
        time.sleep(0.05)
        pyautogui.click()
        for i in range(20):
            time.sleep(0.005)
            pyautogui.press('backspace')
        keyboard.write(faktura[5])
        time.sleep(0.3)
        mcws(440, 380, 0.3, 'PL')
        mcws(225, 410, 0.3, faktura[6])
        if len(faktura) >= 8:
            mcws(260, 470, 0.3, faktura[7])
    time.sleep(0.5)
    try:
        os.remove(paragon_path)
    except:
        pass

def gui_otworz_edytor_tytulow():
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "title_creator.pyw")
    subprocess.Popen([sys.executable, path], shell=True)

def gui_wprowadz_paragon():
    pozycje = []
    with open(paragon_path, "r", encoding="utf-8") as f:
        global ostatnie_zrodlo
        if f.readline().strip().endswith("(Allegro)"):
            ostatnie_zrodlo =  "Wygenerowane z Allegro"
        else:
            ostatnie_zrodlo =  "Wygenerowane z WordPress - WP nie wykrywa faktur!"
        label_zrodlo.config(text=ostatnie_zrodlo)
        linie = f.readlines()
    i = 0
    while i < len(linie):
        linia = linie[i].strip()
        if linia.startswith("Zebrane dane"):
            i += 1
            continue
        if re.match(r"\d+\.", linia):
            tytul = re.sub(r"^\d+\.\s*", "", linia)
            if i + 2 < len(linie):
                ilosc_line = linie[i + 1].strip()
                cena_line = linie[i + 2].strip()

                if "Ilość:" in ilosc_line and "Cena:" in cena_line:
                    ilosc = ilosc_line.split("Ilość:")[-1].strip()
                    cena = cena_line.split("Cena:")[-1].strip()

                    pozycje.append({
                        "ilosc": ilosc,
                        "tytul": tytul,
                        "cena": cena
                    })
                    i += 3
                    continue
        if linia.startswith("Koszt wysyłki:"):
            koszt = linia.split("Koszt wysyłki:")[-1].strip()
            if koszt != "0,00":
                pozycje.append({
                    "ilosc": "1",
                    "tytul": "Wysyłka",
                    "cena": koszt
                })
        i += 1
    return pozycje

def gui_sprawdz_fakture():
    if status["faktura_wykryta"]:
        kolor = "lime"
    elif status["przetwarza"]:
        kolor = "gray"
    else:
        kolor = "red"
    dioda_faktura.itemconfig(kolo_faktura, fill=kolor)
    tabela_faktura.delete(*tabela_faktura.get_children())  # wyczyść poprzednie dane
    if not status["faktura_wykryta"]:
        return
    if status["faktura_dane"]:
        tabela_faktura.insert("", "end", values=tuple(status["faktura_dane"]))

def gui_aktualizuj_tabele():
    dioda1.itemconfig(kolo1, fill="lime" if status["czeka"] else "gray")
    dioda2.itemconfig(kolo2, fill="blue" if status["przetwarza"] else "gray")
    for item in tabela.get_children():
        tabela.delete(item)
    for pozycja in status["pozycje"]:
        tabela.insert("", tk.END, values=(pozycja["ilosc"], pozycja["tytul"], pozycja["cena"]))
    gui_sprawdz_fakture()
    # Oblicz sumę cen
    suma = 0.0
    for pozycja in status["pozycje"]:
        try:
            cena_str = pozycja["cena"].replace(",", ".").replace("zł", "").strip()
            suma += float(cena_str)
        except ValueError:
            continue
    # Dodaj wiersz "Razem"
    if status["pozycje"]:
        tabela.insert("", tk.END, values=("", "", f"{suma:.2f}".replace('.', ',')), tags=("razem",))
        tabela.tag_configure("razem", font=("Segoe UI", 9, "bold"))
    # Zmieniamy wysokość tabeli dynamicznie
    tabela.config(height=len(status["pozycje"]) + (1 if status["pozycje"] else 1))
    # Aktualizujemy datę paragonu
    if ostatnia_data_paragonu:
        label_ostatni_paragon_czas.config(text=ostatnia_data_paragonu)
    # Blokuje rozszerzanie kolumn
    tabela.column("Ilość", anchor="center", width=40, stretch=False)
    tabela.column("Tytuł", anchor="w", width=450, stretch=False)
    tabela.column("Cena", anchor="center", width=60, stretch=False)
    tabela_faktura.column("Nazwa firmy", anchor="center", width=170, stretch=False)
    tabela_faktura.column("Adres", anchor="center", width=210, stretch=False)
    tabela_faktura.column("Telefon", anchor="center", width=95, stretch=False)
    tabela_faktura.column("NIP", anchor="center", width=75, stretch=False)
    root.after(500, gui_aktualizuj_tabele)

def petla_robocza():
    while True:
        if os.path.exists(paragon_path):
            wprowadz_paragon()
            status["przetwarza"] = False
            pygame.mixer.music.load('done.mp3')
            pygame.mixer.music.play()
        else:
            status["czeka"] = True
            status["przetwarza"] = False
        time.sleep(1)

# --- GUI ---
root = tk.Tk()
root.geometry("600x400")
root.resizable(False, False)
root.configure(bg="#f2f2f2")
root.title("Automatyczna Paragoniarka")
ikona = os.path.join(os.path.dirname(__file__), "icon.png")
root.iconphoto(False, PhotoImage(file=ikona))

frame = ttk.Frame(root, padding=20)
frame.pack(fill=tk.BOTH, expand=True)

# Diodki stanu
dioda1 = tk.Canvas(frame, width=30, height=30)
kolo1 = dioda1.create_oval(5, 5, 20, 20, fill="gray")
dioda1.grid(row=0, column=0, padx=(0, 10), pady=(0, 44), sticky="w")
ttk.Label(frame, text="Oczekiwanie na paragon").grid(row=0, column=0, sticky="w", padx=(35, 0), pady=(0, 50))

dioda2 = tk.Canvas(frame, width=30, height=30)
kolo2 = dioda2.create_oval(5, 5, 20, 20, fill="gray")
dioda2.grid(row=0, column=0, padx=(0, 10), pady=(26, 0), sticky="w")
ttk.Label(frame, text="Wprowadzanie paragonu").grid(row=0, column=0, sticky="w", padx=(35, 0), pady=(20, 0))

przycisk_edytuj_tytuly = ttk.Button(frame, text="Edytuj tytuły", padding=20, command=gui_otworz_edytor_tytulow)
przycisk_edytuj_tytuly.grid(row=0, column=2, sticky="s", padx=(270, 0), pady=(0, 10))

# Label "Ostatni paragon" - teraz pomiędzy diodami a tabelą
label_ostatni_paragon_text = ttk.Label(frame, text="Ostatni paragon:", font=("Segoe UI", 10, "bold"))
label_ostatni_paragon_text.grid(row=1, column=0, sticky="w")

label_ostatni_paragon_czas = ttk.Label(frame, text="—", font=("Segoe UI", 10, "italic"))
label_ostatni_paragon_czas.grid(row=1, column=2, sticky="e")

# Tabela paragonu
ttk.Style().configure("Treeview.Heading", font=("Segoe UI", 9, "bold"))
tabela = ttk.Treeview(frame, columns=("Ilość", "Tytuł", "Cena"), show="headings", height=1)

tabela.heading("Ilość", text="Ilość")
tabela.heading("Tytuł", text="Tytuł")
tabela.heading("Cena", text="Cena")

tabela.column("Ilość", anchor="center", width=40, stretch=False)
tabela.column("Tytuł", anchor="w", width=450, stretch=False)
tabela.column("Cena", anchor="center", width=60, stretch=False)

tabela.grid(row=2, column=0, columnspan=3, pady=5)

# Tabela faktury
frame_faktura = ttk.Frame(frame)
frame_faktura.grid(row=3, column=0, columnspan=3, pady=5)

dioda_faktura = tk.Canvas(frame_faktura, width=20, height=20)
kolo_faktura = dioda_faktura.create_oval(5, 5, 15, 15, fill="gray")
dioda_faktura.grid(row=0, column=0, sticky="w", padx=(50, 0), pady=(4, 0))

label_zrodlo = ttk.Label(frame_faktura, text="", font=("Segoe UI", 10, "italic"))
label_zrodlo.grid(row=0, column=1, sticky="e")

label_faktura = ttk.Label(frame_faktura, text="Faktura", font=("Segoe UI", 10, "bold"))
label_faktura.grid(row=0, column=0, sticky="w")

tabela_faktura = ttk.Treeview(frame_faktura, columns=("Nazwa firmy", "Adres", "Telefon", "NIP"), show="headings", height=1)

tabela_faktura.heading("Nazwa firmy", text="Nazwa firmy")
tabela_faktura.heading("Adres", text="Adres")
tabela_faktura.heading("Telefon", text="Telefon")
tabela_faktura.heading("NIP", text="NIP")

tabela_faktura.column("Nazwa firmy", anchor="center", width=170, stretch=False)
tabela_faktura.column("Adres", anchor="center", width=210, stretch=False)
tabela_faktura.column("Telefon", anchor="center", width=95, stretch=False)
tabela_faktura.column("NIP", anchor="center", width=75, stretch=False)

tabela_faktura.grid(row=1, column=0, columnspan=2)

# Wątek roboczy
if os.path.exists(paragon_path):
    time.sleep(3)
    os.remove(paragon_path)
    if os.path.exists(faktura_path):
        os.remove(faktura_path)

if os.path.exists(faktura_path):
    time.sleep(3)
    os.remove(faktura_path)

watek = threading.Thread(target=petla_robocza, daemon=True)
watek.start()

root.after(500, gui_aktualizuj_tabele)
root.mainloop()