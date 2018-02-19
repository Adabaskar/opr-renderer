# OPRR Content Component Base
Contract definitions to which Content Components have to adhere.

## Weak Contracts
Most contracts in this package are expressed using interfaces and classes. Since, however, no all contracts can be expressed this way the following list states further assumptions in conjunction with content component implementations:
1. Each content component class will implement a static method `getMetadata() : IContentComponentMetdata`, which returns a metadata object, that identifiers the content component, and names possible configuration and controll options of the content component. The major purpose of this metadata is the reconstruction of content components from a persisted state and the implementation of user interfaces.

