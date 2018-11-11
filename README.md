# Dependency Injection in Javascript #

This is a simple example of doing dependency injection, based on ( deferred ) promises.

The idea is that each component returns an async function, which will in turn, wait for its own dependencies.
The assumption is, that at some point there will be components which don't have additional dependencies. Once those are reached, them and their dependents can be resolved, bubbling up and resolving each component.