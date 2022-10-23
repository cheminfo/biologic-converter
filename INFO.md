# BioLogic
* What is it? ([website](https://www.biologic.net/))

- BioLogic is a company that manufactures instruments and software (interface to their products). 
- Mostly for electrochem but also spectrometers. 
- For most of the electrochemical equipment, the software they use Biologic EC-Lab Software (Electro Chemistry Lab.)
- They have other software (most seem just simplifications of EC-Lab.)

## Measurements
In electrochemical experiments normally:
 - I is controlled (use a Galvanostat), and E varies,
   - GC (Galvanostatic Cycling)
   - CP (Chronopotentiometry) 
 or  
 - E controlled with a potentiostat, and I varies.
   - CV (Cycling Voltammetry)
   - CA (Chrono Amperometry)
 
Controlled does not min static, but that you set how it evolves over time (including keeping it the same.)

## EC-Lab
> EC-Lab is the universal control and analysis platform for all BioLogic Potentiostat/Galvanostats/FRAs.
> (...) Supports over 100 techniques 
>  (...) EC-Lab is now compatible with Windows XP© (SP3), 7, 8 (32 or 64 bits), 10 (32 or 64 bits), 11 (32 or 64 bits).

## EC-Lab software Techniques and Applications manual

* Apparent resistance ($R_i$): conventional term defining the electrolytic resistance in a solid elec-
trochemical system such as a battery. Ri is defined as the ratio dE/dI when the potentiostat
switches from an open circuit voltage mode to a galvanostatic mode or vice versa.
* Bandwidth: represents the frequency of the regulation loop of the potentiostat. Choosing the
suitable one depends on the electrochemical cell impedance. A cell with a high impedance
and slow response will require a low bandwidth. The bandwidth values go from 1 to 7 with
increasing frequency.
* Calibration: operation that must be done for each channel in order to reduce the difference
between a controlled value (for example Ectrl) and the corresponding measured value (for ex-
ample Ewe).
* Channels: each one of the boards corresponding to an independent Potentiostat/Galvanostat.
* ChronoAmperometry/chronocoulometry (CA): controlled potential technique that consists
in increasing step by step the potential of the working electrode from an open circuit potential
to another potential $E_i$ where electrochemical reactions occur. The resulting curve is a current-
time response. Chronocoulometry is an alternative mode for recording the charged passed as
a function of time with current integration.
* ChronoPotentiometry (CP): controlled current technique where the potential is the variable
determined as a function of time during a current step.
Compact: mathematical function allowing the user to compress data points from the raw data
file. Compact functions are available with GCPL and PCGA techniques. All points of each po-
tential step are replaced by their average taken at the end of the potential step. The number
of points of the compacted data file decreases a lot according to the raw file.
* Constant Load Discharge (CLD): technique especially designed for battery testing. This tech-
nique is used to discharge a battery at a constant resistance. The potentiostat is seen as a
constant resistor by the battery.
* Constant Power (CPW): This technique is designed to study the discharge of a battery at
constant power. The control is made by checking the current to maintain an $E$x$I$ constant.
* Corrosimetry: application used in corrosion for the determination of Rp versus time by a rep-
etition of the polarization around the corrosion potential at fixed time intervals.
* Cycle: inside a technique, this term is used to describe a sequence repeated with time.
Techniques and Applications Manual
230
* Cycle number: processing function that allows the user to display on the graphic one or sev-
eral cycles chosen in the raw file. The selected cycles are lightened and the others are hidden.
* Cyclic Potentiodynamic Pitting (CPP): corrosion technique used to evaluate pitting suscep-
tibility and made with a potentiodynamic part and a conditional potentiostatic part which is
taken into account if the pitting current is not reached during the potentiodynamic part.
* Cyclic Voltammetry (CV): this technique consists in scanning the potential of the working
electrode and measuring the current resulting from oxydo-reduction reactions. Cyclic voltam-
metry provides information on redox processes, electron transfer reactions and adsorption
processes.
* Depassivation Potential (DP): corrosion technique composed with a potentiostatic part used
to depassivate the electrode metal and with a potentiodynamic part used to study the corrosion
pitting.
* Differential Pulse Voltammetry (DPV): technique used in analytical electrochemistry to dis-
criminate faradic from capacitive current. This technique consists in pulses superimposed on
a potential sweep.
* Differential Normal Pulse Voltammetry (DNPV): technique used in analytical electrochem-
istry to discriminate faradic from capacitive current. This technique is made of increasing pre-
pulses with time and pulses superimposed on the prepulses.
* Differential Pulse Amperometry (DPA): technique used in analytical electrochemistry to dis-
criminate faradic from capacitive current. This technique consists in the repetition of a pulse
sequences made with a prepulse and a superimposed pulse.
EC-Lab: software that drives the multichannel potentiostats/galvanostat
* Galvanostatic Cycling with Potential Limitation (GCPL): battery testing technique corre-
sponding to battery cycling under galvanostatic mode with potential limitations and with the
ability to hold a potentiostatic mode after the galvanostatic one.
* Galvanostatic Cycling with Potential Limitation 2 (GCPL2): battery testing technique simi-
lar to the GCPL but with two potential limitations on the working electrode and on the counter
electrode potential. The potential is not held after the current charge/discharge.
* Galvanostatic Cycling with Potential Limitation 3 (GCPL3): battery testing technique simi-
lar to the GCPL2 with the ability to hold the working electrode potential after the galvanostatic
phase.
* Galvanostatic Cycling with Potential Limitation 4 (GCPL4): battery testing technique simi-
lar to the GCPL with a global time limitation for the charge/discharge period.
* Galvanostatic Cycling with Potential Limitation 5 (GCPL5): battery testing technique simi-
lar to the GCPL technique with a different recording conditions of the potential at the beginning
of the galvanostatic period. The potential is recorded with a geometric time progression. The
current/potential is used to calculate the apparent resistance of the cell.
* Galvanostatic Cycling with Potential Limitation 6 (GCPL6): battery testing technique simi-
lar to the GCPL technique except that the Limit potential during the galvanostatic period is
applied the potential difference between the working and the counter electrodes.
Techniques and Applications Manual
231
* Galvanostatic Cycling with Potential Limitation 7 (GCPL7): battery testing technique simi-
lar to the GCPL technique except that the Limit potential is held by controlling the current
needed to keep Ewe at EM value. By doing so, the whole experiment is performed in galvano
mode
* Galvanostatic Electrochemical Impedance Spectroscopy (GEIS): technique for imped-
ance measurement in galvanostatic mode.
* Generalized corrosion (GC): technique used to study general corrosion. It consists of half a
cycle or a cycle of usual cyclic voltammetry with a digital potential sweep.
* I Range: current range used in the experiment. It is related to the current resolution.
* Impedance: defined by the ratio of Laplace Transform of E and the Laplace Transform of I.
* IR compensation: in the electrochemical cell, the resistance between the working and the
reference electrode produces a potential drop that keeps the working electrode from being at
the controlled potential. IR compensation allows the user to set a resistance value to compen-
sate the solution resistance.
* Linear Polarization (LP): technique that consists in a potential ramp around the corrosion
potential. It is often used to determine polarization resistance and corrosion current.
* Linked experiments: EC-Lab offers the ability to link up to ten different experiments with the
technique linker.
* Linked experiment settings: the user can save the settings of linked experiments as a .mpls
file. This allows the user to easily load all the experiment settings.
* Loop: technique available in the linked experiments and used to repeat one or more experi-
ments. It is different from the cycle in an experiment.
Manual Potential control: application that enables the user to directly control the working
electrode potential, using the mouse to move a sliding index.
Modify: button of EC-Lab main window allowing the user to select a technique and change
the experiment parameters (before or during the experiment). This button switches to "Accept"
when the user clicks on.
Modulo Bat (MB): A technique specially dedicated to batteries that combines all the available
control modes, recording and limiting conditions. Almost all the DC techniques in EC-Lab can
be recreated or customized by setting the adequate sequences.
Modular Galvano (MG): technique designed to perform a combination of OCV, galvanostatic
and galvanodynamic periods. The user can link the MG sequences in any desired way.
Modular Potentio (MP): Technique designed to perform a combination of OCV, potentiostatic
and potentiodynamic periods. The user is free to link the MP sequences the way in any desired
way. This technique can be used to couple potential sweep detections with preconditioning
steps either in OCV or at a particular potential.
Multielectrode Potentiodynamic Pitting (MPP): corrosion technique designed to study pit-
ting corrosion on one or several electrodes together in the same electrochemical cell. This
Techniques and Applications Manual
232
technique corresponds to the pitting potential determination of a material using a potential
sweep.
Multielectrode PotentioStatic Pitting (MPSP): corrosion technique designed to study pitting
corrosion on one or several electrodes together in the electrochemical cell using a potential
step.
Normal Pulse Voltammetry (NPV): technique used in analytical electrochemistry to discrimi-
nate faradic from capacitive current. This technique is made of increasing pulses with time that
always return to the beginning potential.
Open Circuit Voltage (OCV): technique that consists in a period during which no potential or
current is applied to the working electrode. The cell is disconnected and only the potential
measurement is available.
Pause: button of the EC-Lab main window that pauses the progress of the technique and the
measurement recording. During “Pause”, the cell is disconnected (OCV period). The "Pause"
button turns to "Resume" when clicked.
Polarization Resistance (PR): technique similar to CV that is adapted to corrosion. This tech-
nique allows the determination of polarization resistance Rp and corrosion current Icorr.
Potentiodynamic Cycling with Galvanostatic Acceleration (PCGA): Battery technique de-
signed for battery cycling under stepwise potentiodynamic mode. The user can reduce the
potential step duration if the charge or discharge is lower than a given value.
Potentiostatic Electrochemical Impedance Spectroscopy (PEIS): technique that performs
impedance measurements in potentiostatic mode by applying a sinus around a potential E that
can be set to fixed value or relatively to the cell equilibrium potential.
Technique linker: tool of EC-Lab software used to link techniques in order to build a com-
plete experiment with or without open circuit period between techniques.
Reverse Normal Pulse Voltammetry (RNPV): technique used in analytical electrochemistry
to discriminate faradic from capacitive current. This technique is made of increasing pulses
with time that always come back to the beginning potential. The current is sampled in the
opposite way as for the NPV technique.
Scan rate: speed of the potential sweep defined with the smallest possible step amplitude
Square Wave Voltammetry (SWV): technique used in analytical electrochemistry to discrim-
inate faradic from capacitive current. This technique is made of successive positive and nega-
tive pulses according to the averaged potential sweep.
Stepwise Potential Fast Chronoamperometry (SPFC): Simple general electrochemistry
technique used to loop quickly on two potential steps.
Triggers: option that allows the instrument to set a trigger out (TTL signal) at experiment
start/stop or to wait for an external trigger in to start or stop the run.
Zero Resistance Ammeter (ZRA): technique used to perform measurements to examine the
effects of coupling dissimilar metals or to perform electrochemical noise measurements. A
potential of 0 V is applied between the working and the counter electrode.
Techniques and Applications Manual
233
Zero Voltage Current (ZVC): technique similar to ZRA except that the control is done between
the working and the reference elec
