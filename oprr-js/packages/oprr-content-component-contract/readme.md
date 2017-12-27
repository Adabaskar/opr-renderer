# OPR Renderer Content Component Contract

Contains the common contract for oprr content components classes.

# Thoughts on the Design of the Content Component State

The State Model of the component.
Since a component also has strong visual responsibilities, as well as management responsibilities, 
it is not cleanly possible to seperate out view-technology based component state, configuration based component state
and content domain based component state.
Moreover a compact editor implementation will have the need to access all information, unless a better systematic 
pattern can be found on which a compact editor can rely to allow all required customization options.

However it should be possible to seprate different states and state responsibilities into seperate classes.
The above named categorizations might proof usefull. It should be considered to use an abstraction for visual states, 
however this might proof cumbersome especially when absolute measures are required.